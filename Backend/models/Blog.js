const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        maxlength: [300, 'Excerpt cannot exceed 300 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: String,
        default: 'Jainish Gupta'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Game Development', 'Web Development', 'Tutorial', 'Career', 'Technology', 'Other']
    },
    tags: [{
        type: String,
        trim: true
    }],
    coverImage: {
        type: String,
        default: null
    },
    readTime: {
        type: Number, // in minutes
        default: 5
    },
    views: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();

    // Set publishedAt when first published
    if (this.published && !this.publishedAt) {
        this.publishedAt = Date.now();
    }

    next();
});

// Generate slug from title if not provided
blogSchema.pre('validate', function (next) {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Calculate read time based on content length
blogSchema.pre('save', function (next) {
    if (this.content) {
        const wordsPerMinute = 200;
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.ceil(wordCount / wordsPerMinute);
    }
    next();
});

// Index for better query performance
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });

module.exports = mongoose.model('Blog', blogSchema);
