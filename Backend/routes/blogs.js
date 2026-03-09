const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const Analytics = require('../models/Analytics');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/blogs
 * @desc    Get all published blogs (public)
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { category, tag, featured, limit = 10, page = 1 } = req.query;

        // Build query
        const query = { published: true };

        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (featured === 'true') query.featured = true;

        // Execute query with pagination
        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select('-content'); // Exclude full content for list view

        const total = await Blog.countDocuments(query);

        res.status(200).json({
            status: 'success',
            data: {
                blogs,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/blogs/:slug
 * @desc    Get single blog by slug (public)
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,
            published: true
        });

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Increment view count
        blog.views += 1;
        await blog.save();

        // Track analytics
        await Analytics.create({
            type: 'blog_view',
            resourceId: blog.slug,
            metadata: {
                userAgent: req.headers['user-agent'],
                referrer: req.headers.referer
            }
        });

        res.status(200).json({
            status: 'success',
            data: { blog }
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/blogs/admin/all
 * @desc    Get all blogs including unpublished (admin)
 * @access  Private
 */
router.get('/admin/all', protect, async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: { blogs }
        });
    } catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   POST /api/blogs
 * @desc    Create new blog
 * @access  Private
 */
router.post('/', protect, [
    body('title').notEmpty().withMessage('Title is required'),
    body('excerpt').notEmpty().withMessage('Excerpt is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }

    try {
        const blog = await Blog.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            data: { blog }
        });
    } catch (error) {
        console.error('Create blog error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                status: 'error',
                message: 'Blog with this slug already exists'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update blog
 * @access  Private
 */
router.put('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully',
            data: { blog }
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete blog
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

module.exports = router;
