require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');

// Static games data from src/data/projects.js
// NOTE: Update thumbnail paths to match your actual image locations
const gamesData = [
    {
        title: 'Car Race',
        slug: 'car-race',
        description: 'An exciting racing game where you compete against time and obstacles. Built with Unity and optimized for WebGL performance.',
        thumbnail: '/Images/GameImages/CarRace_Game.png',
        gamePath: '/Games/CarRace/CarRace/index.html',
        category: 'Racing',
        tags: ['Racing', 'Action', '3D', 'Unity', 'WebGL'],
        controls: 'Arrow Keys or WASD to drive\nSpace to brake',
        published: true,
        featured: true
    },
    {
        title: 'Memory Game',
        slug: 'memory-game',
        description: 'Test your memory skills by matching pairs of cards in this classic game. Features smooth animations and responsive design.',
        thumbnail: '/Images/GameImages/MemoryGame_Game.png',
        gamePath: '/Games/MemoryGame/MemoryGame/index.html',
        category: 'Puzzle',
        tags: ['Puzzle', 'Casual', '2D', 'Unity', 'WebGL'],
        controls: 'Click or tap on cards to flip them\nMatch pairs to win',
        published: true,
        featured: false
    },
    {
        title: 'Space Shooter',
        slug: 'space-shooter',
        description: 'Defend the galaxy by shooting down enemy spaceships in this action-packed shooter. Fast-paced gameplay with challenging enemies.',
        thumbnail: '/Images/GameImages/SpaceShooter.png',
        gamePath: '/Games/SpaceShooter/SpaceShooter/index.html',
        category: 'Action',
        tags: ['Shooter', 'Action', '2D', 'Unity', 'WebGL'],
        controls: 'Arrow Keys or WASD to move\nSpace to shoot',
        published: true,
        featured: false
    }
];

async function migrateGames() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Check if games already exist
        const existingGames = await Game.find();
        if (existingGames.length > 0) {
            console.log(`⚠️  Found ${existingGames.length} existing games in database`);
            console.log('Do you want to:');
            console.log('1. Skip migration (keep existing games)');
            console.log('2. Add new games only (skip duplicates)');
            console.log('3. Replace all games (delete existing and add new)');
            console.log('\nPlease run with argument: node migrateGamesToDb.js [skip|add|replace]');

            const action = process.argv[2];

            if (!action || action === 'skip') {
                console.log('Skipping migration. Existing games preserved.');
                process.exit(0);
            } else if (action === 'replace') {
                console.log('🗑️  Deleting existing games...');
                await Game.deleteMany({});
                console.log('✅ Deleted all existing games');
            } else if (action === 'add') {
                console.log('➕ Adding only new games...');
            }
        }

        // Migrate games
        let added = 0;
        let skipped = 0;

        for (const gameData of gamesData) {
            const existingGame = await Game.findOne({ slug: gameData.slug });

            if (existingGame) {
                console.log(`⏭️  Skipping "${gameData.title}" - already exists`);
                skipped++;
                continue;
            }

            const game = new Game(gameData);
            await game.save();
            console.log(`✅ Added: ${game.title}`);
            added++;
        }

        console.log('\n📊 Migration Summary:');
        console.log(`   ✅ Added: ${added} games`);
        console.log(`   ⏭️  Skipped: ${skipped} games`);
        console.log(`   📦 Total in DB: ${await Game.countDocuments()} games`);

        // Display all games
        const allGames = await Game.find().select('title slug published featured');
        console.log('\n🎮 Games in Database:');
        allGames.forEach(game => {
            const status = [];
            if (game.published) status.push('Published');
            if (game.featured) status.push('Featured');
            console.log(`   - ${game.title} (${game.slug}) [${status.join(', ') || 'Draft'}]`);
        });

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    }
}

// Run migration
migrateGames();
