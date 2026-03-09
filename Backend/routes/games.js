const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { protect } = require('../middleware/auth');

// GET all published games (public)
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({ published: true })
            .select('-__v')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { games }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch games',
            error: error.message
        });
    }
});

// GET all games (admin - includes unpublished)
// IMPORTANT: This must come BEFORE /:slug route
router.get('/admin/all', protect, async (req, res) => {
    try {
        const games = await Game.find()
            .select('-__v')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { games }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch games',
            error: error.message
        });
    }
});

// GET single game by slug (public)
// IMPORTANT: This must come AFTER /admin/all route
router.get('/:slug', async (req, res) => {
    try {
        const game = await Game.findOne({ slug: req.params.slug, published: true });

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        // Increment play count
        await game.incrementPlays();

        res.json({
            success: true,
            data: { game }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch game',
            error: error.message
        });
    }
});

// POST create new game (admin)
router.post('/', protect, async (req, res) => {
    try {
        const { title, slug, description, thumbnail, gamePath, category, tags, controls, published, featured } = req.body;

        // Check if slug already exists
        const existingGame = await Game.findOne({ slug });
        if (existingGame) {
            return res.status(400).json({
                success: false,
                message: 'A game with this slug already exists'
            });
        }

        const game = new Game({
            title,
            slug,
            description,
            thumbnail,
            gamePath,
            category,
            tags: tags || [],
            controls,
            published: published || false,
            featured: featured || false
        });

        await game.save();

        res.status(201).json({
            success: true,
            message: 'Game created successfully',
            data: { game }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create game',
            error: error.message
        });
    }
});

// PUT update game (admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const { title, slug, description, thumbnail, gamePath, category, tags, controls, published, featured } = req.body;

        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        // Check if new slug conflicts with another game
        if (slug && slug !== game.slug) {
            const existingGame = await Game.findOne({ slug, _id: { $ne: req.params.id } });
            if (existingGame) {
                return res.status(400).json({
                    success: false,
                    message: 'A game with this slug already exists'
                });
            }
        }

        // Update fields
        if (title) game.title = title;
        if (slug) game.slug = slug;
        if (description) game.description = description;
        if (thumbnail) game.thumbnail = thumbnail;
        if (gamePath) game.gamePath = gamePath;
        if (category) game.category = category;
        if (tags) game.tags = tags;
        if (controls !== undefined) game.controls = controls;
        if (published !== undefined) game.published = published;
        if (featured !== undefined) game.featured = featured;

        await game.save();

        res.json({
            success: true,
            message: 'Game updated successfully',
            data: { game }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update game',
            error: error.message
        });
    }
});

// DELETE game (admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        res.json({
            success: true,
            message: 'Game deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete game',
            error: error.message
        });
    }
});

module.exports = router;
