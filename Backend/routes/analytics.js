const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Game = require('../models/Game');
const Comment = require('../models/Comment');
const Analytics = require('../models/Analytics');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/analytics/dashboard
 * @desc    Get dashboard analytics
 * @access  Private
 */
router.get('/dashboard', protect, async (req, res) => {
    try {
        // ========== BLOG STATISTICS ==========
        // Get total blogs count
        const totalBlogs = await Blog.countDocuments();
        const publishedBlogs = await Blog.countDocuments({ published: true });
        const draftBlogs = await Blog.countDocuments({ published: false });

        // Get total views across all blogs
        const viewsResult = await Blog.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);
        const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

        // Get most viewed blogs
        const mostViewedBlogs = await Blog.find({ published: true })
            .sort({ views: -1 })
            .limit(5)
            .select('title slug views');

        // Get recent blogs
        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title slug published createdAt category views');

        // Get analytics for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentAnalytics = await Analytics.countDocuments({
            timestamp: { $gte: thirtyDaysAgo }
        });

        // Get views by category
        const viewsByCategory = await Blog.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', totalViews: { $sum: '$views' }, count: { $sum: 1 } } },
            { $sort: { totalViews: -1 } }
        ]);

        // ========== GAME STATISTICS ==========
        // Get total games count
        const totalGames = await Game.countDocuments();
        const publishedGames = await Game.countDocuments({ published: true });
        const featuredGames = await Game.countDocuments({ featured: true });

        // Get total plays across all games
        const playsResult = await Game.aggregate([
            { $group: { _id: null, totalPlays: { $sum: '$plays' } } }
        ]);
        const totalPlays = playsResult.length > 0 ? playsResult[0].totalPlays : 0;

        // Get average rating
        const ratingResult = await Game.aggregate([
            { $match: { 'rating.count': { $gt: 0 } } },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$rating.average' },
                    totalRatings: { $sum: '$rating.count' }
                }
            }
        ]);
        const avgRating = ratingResult.length > 0 ? ratingResult[0].avgRating : 0;
        const totalRatings = ratingResult.length > 0 ? ratingResult[0].totalRatings : 0;

        // Get most played games
        const mostPlayedGames = await Game.find({ published: true })
            .sort({ plays: -1 })
            .limit(5)
            .select('title slug plays rating');

        // Get top rated games
        const topRatedGames = await Game.find({ published: true, 'rating.count': { $gt: 0 } })
            .sort({ 'rating.average': -1 })
            .limit(5)
            .select('title slug rating plays');

        // Get games by category
        const gamesByCategory = await Game.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', count: { $sum: 1 }, totalPlays: { $sum: '$plays' } } },
            { $sort: { count: -1 } }
        ]);

        // ========== COMMENT STATISTICS ==========
        // Get total comments count
        const totalComments = await Comment.countDocuments();
        const pendingComments = await Comment.countDocuments({ status: 'pending' });
        const approvedComments = await Comment.countDocuments({ status: 'approved' });

        // Get recent comments
        const recentComments = await Comment.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('author content contentSlug contentType status createdAt rating');

        res.status(200).json({
            status: 'success',
            data: {
                blogs: {
                    overview: {
                        totalBlogs,
                        publishedBlogs,
                        draftBlogs,
                        totalViews,
                        recentViews: recentAnalytics
                    },
                    mostViewedBlogs,
                    recentBlogs,
                    viewsByCategory
                },
                games: {
                    overview: {
                        totalGames,
                        publishedGames,
                        featuredGames,
                        totalPlays,
                        avgRating,
                        totalRatings
                    },
                    mostPlayedGames,
                    topRatedGames,
                    gamesByCategory
                },
                comments: {
                    overview: {
                        totalComments,
                        pendingComments,
                        approvedComments
                    },
                    recentComments
                }
            }
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

/**
 * @route   GET /api/analytics/blog/:slug
 * @desc    Get analytics for specific blog
 * @access  Private
 */
router.get('/blog/:slug', protect, async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Get view history for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const viewHistory = await Analytics.aggregate([
            {
                $match: {
                    type: 'blog_view',
                    resourceId: req.params.slug,
                    timestamp: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                blog: {
                    title: blog.title,
                    slug: blog.slug,
                    totalViews: blog.views,
                    published: blog.published,
                    publishedAt: blog.publishedAt
                },
                viewHistory
            }
        });
    } catch (error) {
        console.error('Get blog analytics error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
});

module.exports = router;
