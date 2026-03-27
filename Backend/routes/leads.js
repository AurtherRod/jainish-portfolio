const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

/**
 * @route   POST /api/leads
 * @desc    Submit a new lead (public — no auth required)
 * @access  Public
 */
router.post('/', [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().trim().withMessage('Phone number is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }

    try {
        const { name, email, phone } = req.body;

        // Normalize for duplicate check
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPhone = phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');

        // Check for existing lead with same email OR same phone
        const existingLead = await Lead.findOne({
            $or: [
                { email: normalizedEmail },
                { phone: normalizedPhone }
            ]
        });

        if (existingLead) {
            const emailMatch = existingLead.email === normalizedEmail;
            const phoneMatch = existingLead.phone === normalizedPhone;

            if (emailMatch && phoneMatch) {
                return res.status(409).json({
                    status: 'error',
                    code: 'DUPLICATE_LEAD',
                    message: 'A lead with this email and phone already exists',
                    duplicateFields: ['email', 'phone']
                });
            } else if (emailMatch) {
                return res.status(409).json({
                    status: 'error',
                    code: 'DUPLICATE_EMAIL',
                    message: 'A lead with this email already exists',
                    duplicateFields: ['email']
                });
            } else {
                return res.status(409).json({
                    status: 'error',
                    code: 'DUPLICATE_PHONE',
                    message: 'A lead with this phone number already exists',
                    duplicateFields: ['phone']
                });
            }
        }

        // Determine source based on JWT presence
        let source = 'external';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, process.env.JWT_SECRET);
                source = 'admin-dashboard';
            } catch (e) {
                // Invalid token — treat as external submission (still allowed)
                source = 'external';
            }
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            source,
            status: 'new'
        });

        return res.status(201).json({
            status: 'success',
            message: 'Lead submitted successfully',
            data: { lead }
        });
    } catch (error) {
        // Race condition fallback — MongoDB unique index violation
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const codeMap = { email: 'DUPLICATE_EMAIL', phone: 'DUPLICATE_PHONE' };
            return res.status(409).json({
                status: 'error',
                code: codeMap[field] || 'DUPLICATE_LEAD',
                message: `A lead with this ${field} already exists`,
                duplicateFields: [field]
            });
        }
        console.error('Create lead error:', error);
        res.status(500).json({
            status: 'error',
            code: 'SERVER_ERROR',
            message: 'Server error'
        });
    }
});


/**
 * @route   GET /api/leads/admin/all
 * @desc    Get all leads with optional status filter (admin)
 * @access  Private
 */
router.get('/admin/all', protect, async (req, res) => {
    try {
        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }

        const leads = await Lead.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: { leads, count: leads.length }
        });
    } catch (error) {
        console.error('Get leads error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/leads/admin/stats
 * @desc    Get lead counts by status (admin)
 * @access  Private
 */
router.get('/admin/stats', protect, async (req, res) => {
    try {
        const stats = await Lead.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const result = { new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 };
        stats.forEach(({ _id, count }) => {
            result[_id] = count;
            result.total += count;
        });

        res.status(200).json({
            status: 'success',
            data: { stats: result }
        });
    } catch (error) {
        console.error('Get lead stats error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   PUT /api/leads/:id/status
 * @desc    Update lead status and optional note (admin)
 * @access  Private
 */
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status, note } = req.body;

        const update = { status, updatedAt: Date.now() };
        if (note !== undefined) {
            update.note = note;
        }

        const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });

        if (!lead) {
            return res.status(404).json({
                status: 'error',
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Lead updated successfully',
            data: { lead }
        });
    } catch (error) {
        console.error('Update lead error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   DELETE /api/leads/:id
 * @desc    Delete a lead (admin)
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                status: 'error',
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Lead deleted successfully'
        });
    } catch (error) {
        console.error('Delete lead error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

module.exports = router;
