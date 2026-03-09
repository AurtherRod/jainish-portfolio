const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/comments/:slug
 * @desc    Get all approved comments for a blog or game (public)
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
    try {
        const { type = 'blog' } = req.query;

        const query = {
            status: 'approved'
        };

        // Support both old blogSlug and new contentSlug format
        if (type === 'blog') {
            query.$or = [
                { blogSlug: req.params.slug },
                { contentType: 'blog', contentSlug: req.params.slug }
            ];
        } else {
            query.contentType = type;
            query.contentSlug = req.params.slug;
        }

        const comments = await Comment.find(query)
            .sort({ createdAt: -1 })
            .select('-author.email'); // Don't expose emails publicly

        res.status(200).json({
            status: 'success',
            data: { comments }
        });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   POST /api/comments
 * @desc    Submit a new comment for blog or game (public - requires moderation)
 * @access  Public
 */
router.post('/', [
    body('author.name').notEmpty().trim().withMessage('Name is required'),
    body('author.email').isEmail().withMessage('Valid email is required'),
    body('content').notEmpty().trim().withMessage('Comment content is required')
        .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }

    try {
        const { blogSlug, contentSlug, contentType = 'blog', author, content, rating, parentCommentId } = req.body;

        // Use contentSlug if provided, otherwise fall back to blogSlug for backward compatibility
        const slug = contentSlug || blogSlug;
        const type = contentType;

        if (!slug) {
            return res.status(400).json({
                status: 'error',
                message: 'Content slug is required'
            });
        }

        // Verify content exists
        if (type === 'blog') {
            const blog = await Blog.findOne({ slug, published: true });
            if (!blog) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Blog not found'
                });
            }
        } else if (type === 'game') {
            const Game = require('../models/Game');
            const game = await Game.findOne({ slug, published: true });
            if (!game) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game not found'
                });
            }
        }

        // If replying to a comment, verify parent exists
        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Parent comment not found'
                });
            }
        }

        const comment = await Comment.create({
            contentType: type,
            contentSlug: slug,
            blogSlug: type === 'blog' ? slug : undefined, // Backward compatibility
            author,
            content,
            rating: type === 'game' && rating ? rating : undefined,
            parentCommentId: parentCommentId || null,
            status: 'pending'
        });

        res.status(201).json({
            status: 'success',
            message: 'Comment submitted successfully. It will appear after admin approval.',
            data: { comment }
        });
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/comments/admin/pending
 * @desc    Get all pending comments (admin)
 * @access  Private
 */
router.get('/admin/pending', protect, async (req, res) => {
    try {
        const comments = await Comment.find({ status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('parentCommentId', 'content author.name');

        res.status(200).json({
            status: 'success',
            data: { comments }
        });
    } catch (error) {
        console.error('Get pending comments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/comments/admin/all
 * @desc    Get all comments with filters (admin)
 * @access  Private
 */
router.get('/admin/all', protect, async (req, res) => {
    try {
        const { status, blogSlug } = req.query;
        const query = {};

        if (status) query.status = status;
        if (blogSlug) query.blogSlug = blogSlug;

        const comments = await Comment.find(query)
            .sort({ createdAt: -1 })
            .populate('approvedBy', 'name email');

        res.status(200).json({
            status: 'success',
            data: { comments }
        });
    } catch (error) {
        console.error('Get all comments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   PUT /api/comments/:id/approve
 * @desc    Approve a comment (admin)
 * @access  Private
 */
router.put('/:id/approve', protect, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                status: 'approved',
                approvedAt: Date.now(),
                approvedBy: req.user.id
            },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Comment approved successfully',
            data: { comment }
        });
    } catch (error) {
        console.error('Approve comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   PUT /api/comments/:id/reject
 * @desc    Reject a comment (admin)
 * @access  Private
 */
router.put('/:id/reject', protect, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Comment rejected successfully',
            data: { comment }
        });
    } catch (error) {
        console.error('Reject comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete a comment (admin)
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        // Also delete all replies to this comment
        await Comment.deleteMany({ parentCommentId: req.params.id });

        res.status(200).json({
            status: 'success',
            message: 'Comment and its replies deleted successfully'
        });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

module.exports = router;
