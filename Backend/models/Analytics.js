const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['page_view', 'blog_view', 'project_view'],
        required: true
    },
    resourceId: {
        type: String, // blog slug or page name
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    metadata: {
        userAgent: String,
        referrer: String,
        ip: String
    }
});

// Index for better query performance
analyticsSchema.index({ type: 1, resourceId: 1 });
analyticsSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
