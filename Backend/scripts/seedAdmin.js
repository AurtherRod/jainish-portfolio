const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            email: process.env.ADMIN_EMAIL || 'admin@jainish.space',
            password: process.env.ADMIN_PASSWORD || 'changeme123',
            name: 'Jainish Gupta',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully');
        console.log('📧 Email:', admin.email);
        console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'changeme123');
        console.log('\n⚠️  IMPORTANT: Change your password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
