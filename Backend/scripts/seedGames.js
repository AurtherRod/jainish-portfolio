require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');

const gamesToSeed = [
    {
        title: "Space Shooter",
        slug: "space-shooter",
        description: "Classic space shooter game. Destroy enemies and survive waves of attacks.",
        category: "Action",
        gamePath: "/Games/SpaceShooter/index.html",
        thumbnail: "/Images/GameImages/SpaceShooter.png",
        plays: 0,
        published: true
    },
    {
        title: "Flappy Bird Clone",
        slug: "flappy-bird-clone",
        description: "Navigate through pipes without hitting them. Simple but addictive gameplay.",
        category: "Casual",
        gamePath: "/Games/FlappyBird/index.html",
        thumbnail: "/Images/GameImages/FlappyBird.png",
        plays: 0,
        published: true
    },
    {
        title: "Puzzle Master",
        slug: "puzzle-master",
        description: "Solve challenging puzzles and test your problem-solving skills.",
        category: "Puzzle",
        gamePath: "/Games/PuzzleMaster/index.html",
        thumbnail: "/Images/GameImages/PuzzleMaster.png",
        plays: 0,
        published: true
    },
    {
        title: "Memory Game",
        slug: "memory-game",
        description: "Match pairs of cards and improve your memory. Great for all ages.",
        category: "Casual",
        gamePath: "/Games/MemoryGame/index.html",
        thumbnail: "/Images/GameImages/MemoryGame.png",
        plays: 0,
        published: true
    },
    {
        title: "Snake Game",
        slug: "snake-game",
        description: "Classic snake game. Eat food and grow longer without hitting walls.",
        category: "Casual",
        gamePath: "/Games/Snake/index.html",
        thumbnail: "/Images/GameImages/Snake.png",
        plays: 0,
        published: true
    }
];

async function seedGames() {
    try {
        console.log('=== Game Seeding Script ===\n');

        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB successfully!\n');

        // Clear existing games
        console.log('Clearing existing games...');
        const deleteResult = await Game.deleteMany({});
        console.log(`✓ Cleared ${deleteResult.deletedCount} existing games\n`);

        // Seed games
        console.log('Seeding games to database...\n');
        let successCount = 0;
        let errorCount = 0;

        for (const gameData of gamesToSeed) {
            try {
                const game = new Game({
                    title: gameData.title,
                    slug: gameData.slug,
                    description: gameData.description,
                    category: gameData.category,
                    gamePath: gameData.gamePath,
                    thumbnail: gameData.thumbnail,
                    plays: gameData.plays,
                    published: gameData.published
                });

                await game.save();
                console.log(`✓ Seeded: ${game.title}`);
                successCount++;
            } catch (error) {
                console.error(`✗ Failed to seed game "${gameData.title}":`, error.message);
                errorCount++;
            }
        }

        console.log(`\n=== Seeding Complete ===`);
        console.log(`Successfully seeded: ${successCount} games`);
        console.log(`Failed: ${errorCount} games`);
        console.log(`Total: ${gamesToSeed.length} games\n`);

        // Display summary
        const allGames = await Game.find({}).select('title category plays rating');
        console.log('Games in database:');
        allGames.forEach((game, index) => {
            console.log(`${index + 1}. ${game.title} (${game.category})`);
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
console.log('Starting game seeding...\n');
seedGames();
