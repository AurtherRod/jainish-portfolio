const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    gamePath: {
        type: String,
        required: true,
        // This will be the path to the game files (e.g., /games/car-race/index.html)
    },
    category: {
        type: String,
        required: true,
        enum: ['Racing', 'Puzzle', 'Action', 'Adventure', 'Casual', 'Strategy', 'Other']
    },
    tags: [{
        type: String,
        trim: true
    }],
    controls: {
        type: String,
        // Description of game controls
    },
    published: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    plays: {
        type: Number,
        default: 0
    },
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Index for faster queries
gameSchema.index({ slug: 1 });
gameSchema.index({ published: 1 });
gameSchema.index({ featured: 1 });

// Increment play count
gameSchema.methods.incrementPlays = function () {
    this.plays += 1;
    return this.save();
};

module.exports = mongoose.model('Game', gameSchema);
