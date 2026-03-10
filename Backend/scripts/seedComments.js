require('dotenv').config();
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const Game = require('../models/Game');

const commentsToSeed = [
    {
        author: {
            name: "John Developer",
            email: "john@example.com"
        },
        content: "Great article! Really helped me understand WebSockets better.",
        status: "approved",
        rating: null,
        contentSlug: "websockets-vs-rest-apis-unity-game",
        contentType: "blog"
    },
    {
        author: {
            name: "Sarah Gamer",
            email: "sarah@example.com"
        },
        content: "Love this game! So addictive and fun.",
        status: "approved",
        rating: 5,
        contentSlug: "space-shooter",
        contentType: "game"
    },
    {
        author: {
            name: "Mike Backend",
            email: "mike@example.com"
        },
        content: "The Node.js deployment guide was exactly what I needed.",
        status: "approved",
        rating: null,
        contentSlug: "deploying-nodejs-app-aws-nginx",
        contentType: "blog"
    },
    {
        author: {
            name: "Emma Player",
            email: "emma@example.com"
        },
        content: "Good game but a bit difficult. Would love more levels.",
        status: "approved",
        rating: 4,
        contentSlug: "flappy-bird-clone",
        contentType: "game"
    },
    {
        author: {
            name: "Alex Coder",
            email: "alex@example.com"
        },
        content: "Waiting for more content!",
        status: "pending",
        rating: null,
        contentSlug: "custom-in-game-inventory-system",
        contentType: "blog"
    }
];

async function seedComments() {
    try {
        console.log('=== Comment Seeding Script ===\n');

        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB successfully!\n');

        // Get first blog and game
        const firstBlog = await Blog.findOne();
        const firstGame = await Game.findOne();

        if (!firstBlog && !firstGame) {
            console.log('⚠️  No blogs or games found. Please seed blogs and games first.');
            console.log('Run: node scripts/migrateBlogsToDb.js');
            console.log('Run: node scripts/seedGames.js');
            process.exit(1);
        }

        // Clear existing comments
        console.log('Clearing existing comments...');
        const deleteResult = await Comment.deleteMany({});
        console.log(`✓ Cleared ${deleteResult.deletedCount} existing comments\n`);

        // Seed comments
        console.log('Seeding comments to database...\n');
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < commentsToSeed.length; i++) {
            try {
                const commentData = commentsToSeed[i];

                const comment = new Comment({
                    author: commentData.author,
                    content: commentData.content,
                    status: commentData.status,
                    rating: commentData.rating,
                    contentSlug: commentData.contentSlug,
                    contentType: commentData.contentType
                });

                await comment.save();
                console.log(`✓ Seeded: ${comment.author.name}'s comment`);
                successCount++;
            } catch (error) {
                console.error(`✗ Failed to seed comment:`, error.message);
                errorCount++;
            }
        }

        console.log(`\n=== Seeding Complete ===`);
        console.log(`Successfully seeded: ${successCount} comments`);
        console.log(`Failed: ${errorCount} comments`);
        console.log(`Total: ${commentsToSeed.length} comments\n`);

        // Display summary
        const allComments = await Comment.find({}).select('author status rating');
        console.log('Comments in database:');
        allComments.forEach((comment, index) => {
            const status = comment.status === 'approved' ? '✓' : '⏳';
            const rating = comment.rating ? `⭐${comment.rating}` : '  ';
            console.log(`${index + 1}. ${status} ${rating} ${comment.author.name}`);
        });

    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n✓ Database connection closed.');
        process.exit(0);
    }
}

// Run the seeding
console.log('Starting comment seeding...\n');
seedComments();
