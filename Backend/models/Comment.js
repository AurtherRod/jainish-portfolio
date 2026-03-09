const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // Support both blog and game comments
    contentType: {
        type: String,
        enum: ['blog', 'game'],
        required: true,
        default: 'blog'
    },
    contentSlug: {
        type: String,
        required: [true, 'Content slug is required'],
        index: true
    },
    // Keep blogSlug for backward compatibility
    blogSlug: {
        type: String,
        index: true
    },
    author: {
        name: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
        }
    },
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        trim: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    // For game comments, optional rating
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null // null means top-level comment
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: {
        type: Date,
        default: null
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

// Index for better query performance
commentSchema.index({ contentType: 1, contentSlug: 1, status: 1, createdAt: -1 });
commentSchema.index({ blogSlug: 1, status: 1, createdAt: -1 }); // Keep for backward compatibility
commentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
