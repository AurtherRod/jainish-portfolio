const mongoose = require('mongoose');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-test';

jest.setTimeout(10000);

// Skip MongoDB connection for simple tests
// Only connect if needed for specific test suites
beforeAll(async () => {
    // Optional: Connect to MongoDB if needed
    // Uncomment for integration tests
    /*
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 5000,
            });
        }
    } catch (error) {
        console.warn('MongoDB connection skipped for unit tests');
    }
    */
}, 10000);

afterAll(async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    } catch (error) {
        console.warn('MongoDB cleanup skipped');
    }
}, 10000);
