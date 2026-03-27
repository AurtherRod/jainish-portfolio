const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        maxlength: [20, 'Phone cannot exceed 20 characters'],
        set: (v) => v ? v.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '') : v
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'closed'],
        default: 'new'
    },
    note: {
        type: String,
        trim: true,
        maxlength: [500, 'Note cannot exceed 500 characters'],
        default: ''
    },
    source: {
        type: String,
        trim: true,
        default: 'external'
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

// Indexes for efficient admin queries
leadSchema.index({ status: 1, createdAt: -1 });

// Unique indexes to prevent duplicate leads at DB level
leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model('Lead', leadSchema);
