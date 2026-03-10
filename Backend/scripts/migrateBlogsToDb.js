require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');

// Import all blog data from the frontend static file
// This script will migrate these blogs into MongoDB

const blogsToMigrate = [
    {
        slug: "websockets-vs-rest-apis-unity-game",
        title: "WebSockets vs. REST APIs: Choosing the Right Tool for Your Unity Game",
        excerpt: "Choosing the right communication protocol for your backend can make or break your application's performance. This guide compares WebSockets vs REST APIs with real implementation examples from production systems.",
        publishedAt: "2025-05-15",
        category: "Game Development",
        tags: ["Unity", "Backend", "WebSockets", "REST API", "Node.js", "C#"],
        featured: false,
        content: `When you decide to connect your Unity game to a server, you're faced with a critical architectural choice: how will they communicate? The two leading contenders for this job are REST APIs and WebSockets. Choosing the wrong one can lead to laggy gameplay or an inefficient, overloaded server.

Having used both extensively in professional projects—from REST APIs in a blockchain game to WebSockets in high-fidelity industrial simulations—I've learned that the right choice depends entirely on the type of communication your game needs.

## REST APIs: The Reliable Messenger

Think of a REST API as sending a letter. You write a request, send it, and wait for a response. Once the response arrives, the conversation is over until you send a new letter.

**When to Use REST in Unity:**
* Leaderboards: Submitting a score at the end of a round
* Player Authentication: Logging in a user
* In-Game Store: Fetching item data
* Inventory Management: Saving or loading a player's inventory

## WebSockets: The Live Conversation

Think of a WebSocket as a telephone call. You establish a connection, and the line stays open. Both you and the server can talk freely and instantly without having to redial each time.

**When to Use WebSockets in Unity:**
* Real-Time Multiplayer: Sending player positions and actions every frame
* Live Chat Systems: Instantly delivering messages to all players in a lobby
* Real-Time Data Streaming: Sending live input from a controller to a server
* Live Events: The server pushing an event to all connected clients

## Conclusion

The choice is simple when you focus on the job to be done:
- For data that can wait, like fetching a profile or saving a score, use a REST API
- For data that can't wait, like player movement or chat messages, use a WebSocket

By understanding the strengths of each tool, you can build more responsive, efficient, and scalable connected games.`
    },
    {
        slug: "scalable-game-backend-nodejs-mongodb",
        title: "Building a Scalable Game Backend with Node.js and MongoDB",
        excerpt: "Building secure backends that prevent cheating requires more than just validation. Learn how to architect event-driven systems with Node.js and MongoDB that scale to thousands of concurrent users while maintaining data integrity.",
        publishedAt: "2025-06-12",
        category: "Game Development",
        tags: ["Node.js", "MongoDB", "Security", "Game Development", "Scalability", "Architecture"],
        featured: false,
        content: `A modern game's success often hinges on its backend—the invisible engine that drives leaderboards, manages player data, and ensures a fair playing field. But a common vulnerability lies in how games handle scoring.

Throughout my experience constructing backends for applications ranging from a 2D blockchain game to high-fidelity industrial simulations, I've learned that the most reliable architecture is one that doesn't blindly trust the client. Instead, the server should be the ultimate source of truth.

## The Problem with Trusting the Client

A simple architecture where the game client sends its final score to the server is easy to implement but fundamentally insecure. A cheater can easily bypass the game's logic and send a fake request with an impossibly high score.

## Architecture for a Cheat-Resistant Backend

We'll use an event-sourcing model. During a level, the client will send a series of time-stamped events to the server. The server validates these events and, at the end of the session, calculates the final score.

**Our Core Technologies:**
* Node.js: Perfect for handling numerous small, concurrent event requests from players
* MongoDB: Its flexible document structure is ideal for storing varied game events and session data

## Conclusion

By shifting from a trust-based model to an event-driven, verifiable one, you create a much more secure and fair environment for your players.`
    },
    {
        slug: "flutter-nodejs-for-startups",
        title: "Why I Chose Flutter and Node.js for My Startups",
        excerpt: "As CTO of two startups, I made critical technology decisions that determined our success. Here's why I chose Node.js for fintech backends processing 1000+ daily transactions and Flutter for mobile apps serving 500+ institutions.",
        publishedAt: "2025-07-12",
        category: "Career",
        tags: ["Flutter", "Node.js", "Startup", "CTO", "Ed-Tech", "Fintech"],
        featured: false,
        content: `As a Co-Founder and CTO, one of the most impactful decisions you'll make is choosing the technology stack. This choice dictates your development speed, scalability, and ability to hire.

Having directed the technological vision for startups in two different demanding sectors—Ed-Tech with Find and Analyze Pvt. Ltd. and Fintech with Trustopay Innovations Pvt. Ltd.—I've consistently relied on Node.js for the backend, and in the case of our mobile-first Ed-Tech platform, Flutter for the front end.

## Why Node.js for the Backend?

Across both an educational platform and a financial one, the backend needs to be fast, reliable, and scalable. Node.js was the clear winner for several reasons:

* Performance and Scalability: Node.js's non-blocking, event-driven architecture is a massive advantage
* Speed of Development: The vast npm ecosystem provides ready-made modules for almost any functionality
* Versatility: It's a powerful general-purpose tool that doesn't lock you into a specific niche

## The Ed-Tech Experience: The "Class and Class" App

For my educational startup, Find and Analyze, we needed to build a high-quality mobile application for both iOS and Android without the budget for two separate native teams.

* Cross-Platform with a Single Codebase: This is Flutter's killer feature
* Fast, Expressive UI Development: Flutter's "hot reload" feature is a game-changer
* Native Performance: Flutter compiles to native code

## Conclusion

The decision to use Node.js as a versatile backend and Flutter for mobile development was pivotal to my ability to launch and scale efficiently.`
    },
    {
        slug: "custom-in-game-inventory-system",
        title: "How to Build a Custom In-Game Inventory System from Scratch",
        excerpt: "Server-side inventory systems prevent cheating and ensure data persistence. Learn how to build secure, scalable inventory APIs with Node.js and MongoDB that handle thousands of concurrent players.",
        publishedAt: "2025-09-12",
        category: "Game Development",
        tags: ["Unity", "C#", "Node.js", "MongoDB", "Full-Stack", "Game Design"],
        featured: false,
        content: `An inventory system is the heart of many games, from RPGs to shooters. It's where players store their hard-earned loot, customize their characters, and engage with the game's economy.

When I developed "Racecade," a 2D blockchain game, I constructed the entire backend, including the in-game inventory system, using Node.js and MongoDB. This experience taught me the importance of a robust server-side architecture.

## The Architecture: Why Full-Stack?

A common mistake is to handle the entire inventory on the game client. This is insecure and makes it easy for players to cheat. A secure architecture consists of two parts:

1. The Server (Node.js & MongoDB): This is the single source of truth
2. The Client (Unity & C#): This is responsible for displaying the inventory

## Conclusion

By building your inventory system with a dedicated backend, you create a secure and persistent experience for your players.`
    },
    {
        slug: "custom-editors-level-generators-unity",
        title: "How to Build Custom Editors and Level Generators in Unity",
        excerpt: "Automate repetitive development tasks and boost productivity with Unity Editor Scripting. Build custom tools, level generators, and workflow automation that saves hours of manual work.",
        publishedAt: "2025-08-13",
        category: "Game Development",
        tags: ["Unity", "C#", "Editor Scripting", "Tools", "Level Design", "Workflow"],
        featured: true,
        content: `As game developers, we spend countless hours inside the Unity Editor. But what if you could make the editor work for you? Repetitive tasks like placing objects, configuring prefabs, and setting up levels can slow down development.

In projects like the blockchain game "Racecade," I employed editor scripting to refine core game mechanics and handle procedural level generation. This turned hours of manual work into a single button click.

## What is Editor Scripting?

Editor scripting is the practice of writing C# code that extends the Unity Editor's functionality. This code runs inside the editor itself, not in your final game.

## Your First Tool: The Custom Inspector

A custom inspector allows you to change how a component's properties are displayed in the Inspector window. You can add buttons, sliders, and custom visualizations.

## Building a Standalone Level Generator Window

For more complex tools, a custom editor window is the way to go. These are standalone windows you can dock just like the Scene view or Inspector.

## Conclusion

Editor scripting is an essential skill for any serious Unity developer. By investing time into building custom tools, you can automate repetitive tasks and accelerate your entire development process.`
    },
    {
        slug: "custom-unity-vehicle-script-g29-g27",
        title: "A Deep Dive into My Custom Unity Vehicle Script (with G29/G27 Support)",
        excerpt: "Building realistic vehicle physics requires understanding complex systems integration. This deep dive covers data-oriented architecture, powertrain simulation, and professional hardware integration for training simulators.",
        publishedAt: "2025-08-14",
        category: "Game Development",
        tags: ["Unity", "C#", "Vehicle Physics", "ScriptableObjects", "Logitech", "G29", "Simulation", "Architecture"],
        featured: true,
        content: `Creating realistic vehicle physics in Unity is one of the most rewarding challenges a developer can face. While Unity's WheelCollider component provides an excellent physics-based foundation, a truly immersive driving experience requires a custom-built engine.

This blog post is a comprehensive breakdown of a VehicleScript I wrote from the ground up, designed for high-fidelity industrial training simulations where precise and authentic control isn't just a feature—it's the entire point.

## Part 1: The Blueprint - A Data-Oriented Vehicle Setup

A robust controller needs a flexible and intuitive setup. The best practice for this is a data-oriented design, where your logic script (VehicleScript) is separate from your configuration data (CarSettings).

### The Power of ScriptableObjects

Hard-coding values like gear ratios or brake force inside your main script is inefficient. The solution is to use ScriptableObjects. This allows you to create, tweak, and save different vehicle performance profiles as assets.

## Part 2: The Heart of the Machine - Simulating the Powertrain

With the foundation laid, we can simulate the engine and gearbox, pulling all configuration data from our CarSettings asset.

## Part 3: Bridging Man and Machine - Advanced Input Handling

This script was built to support professional hardware, reflecting my experience integrating devices like the Logitech G29/G27.

## Conclusion

Building a great vehicle controller is an exercise in layering details. By starting with a clean, data-oriented architecture and systematically adding a simulated powertrain, you can create an incredibly immersive driving experience.`
    },
    {
        slug: "masterclass-unity-vehicle-script-g29-g27",
        title: "A Masterclass in Creating a Custom Unity Vehicle Script (with G29/G27 Support)",
        excerpt: "Master the art of vehicle simulation with this comprehensive guide covering ScriptableObject architecture, realistic physics modeling, and professional racing wheel integration used in industrial training systems.",
        publishedAt: "2025-09-10",
        category: "Game Development",
        tags: ["Unity", "C#", "Vehicle Physics", "ScriptableObjects", "Logitech", "G29", "Simulation", "Architecture"],
        featured: false,
        content: `Creating truly realistic vehicle physics in Unity is the final frontier for many developers. A genuinely immersive driving experience requires a custom-built engine simulating the complex, interconnected systems of a real car.

This is the level of detail and architectural planning that goes into the high-fidelity industrial training simulations I've helped build, where precise and authentic control isn't just a feature—it's the entire point.

## Part 1: The Architectural Blueprint

Before writing a single line of physics code, we must establish a clean architecture. My approach uses a data-oriented design to keep logic and data separate.

## Part 2: The Powertrain Masterclass

This is the heart of the simulation. We're not just applying force; we're modeling an entire powertrain.

## Part 3: The Human Connection

A great simulation needs to respect great hardware. This script was built from the ground up to support professional racing wheels.

## Conclusion

Creating a high-fidelity vehicle simulation is a journey of layering interconnected systems. Each piece adds a layer of depth that creates an experience that feels authentic and deeply immersive.`
    },
    {
        slug: "deploying-nodejs-app-aws-nginx",
        title: "A Step-by-Step Guide to Deploying a Node.js App on AWS with Nginx",
        excerpt: "Deploy production-ready Node.js applications on AWS with confidence. This step-by-step guide covers EC2 setup, PM2 process management, Nginx configuration, and security best practices for scalable backends.",
        publishedAt: "2025-09-16",
        category: "Tutorial",
        tags: ["Node.js", "AWS", "Nginx", "MongoDB", "DevOps", "Deployment", "Tutorial", "EC2"],
        featured: false,
        content: `Building a powerful application with Node.js and MongoDB is a great accomplishment, but the real test is deploying it for the world to see.

In my 3 years of experience with AWS and Node.js, I've refined a deployment process that is both robust and straightforward. This guide is a detailed, hands-on tutorial.

## Step 1: Launch and Configure an AWS EC2 Instance

Our EC2 instance is the virtual server that will host our entire application.

## Step 2: Set Up the Server Environment

Now, we'll connect to our new server and install all the necessary software.

## Step 3: Run Your App with PM2

Never run a production app with node app.js. PM2 is a process manager that acts as a guardian for our app.

## Step 4: Configure Nginx as a Reverse Proxy

This is the final and most crucial step. We will tell Nginx to forward all public traffic from port 80 to our app's local port.

## Conclusion

Congratulations! You should now be able to visit your EC2 instance's public IP address and see your Node.js application running live.`
    },
    {
        slug: "real-time-leaderboard-nodejs-mongodb-websockets",
        title: "Building a Real-Time Leaderboard System with Node.js, MongoDB, and WebSockets",
        excerpt: "Learn how to architect a cheat-resistant, scalable real-time leaderboard for games or fintech apps using Node.js, MongoDB, and WebSockets—complete with live updates and anti-fraud validation.",
        publishedAt: "2025-10-04",
        category: "Game Development",
        tags: ["Node.js", "MongoDB", "WebSockets", "Leaderboard", "Game Development", "Real-Time", "Security"],
        featured: false,
        content: `Leaderboards are essential for competitive games and many fintech scenarios, driving user engagement and retention. But building a leaderboard that is both real-time and cheat-resistant is a real challenge—especially at scale.

## Core Concepts

- Real-Time Updates: Players see their scores update instantly
- Cheat-Resistance: Leaderboard updates rely only on server-calculated results
- Scalability: Must handle thousands of concurrent users

## Design Choices

- Node.js for handling fast, multiplexed connections
- MongoDB to flexibly store score histories
- WebSockets to push instant updates to every connected client

## Conclusion

By combining the low-latency of WebSockets for live updates with robust server-side validation and scalable MongoDB queries, you unlock a leaderboard that's fast, secure, and fair!`
    },
    {
        slug: "unity-2d-tilemap-pro-auto-tiling-guide",
        title: "Ultimate Guide to Unity 2D Tilemaps & Pro-Grade Auto-Tiling",
        excerpt: "Deep dive into creating smart, scalable, and high-performance 2D worlds in Unity through advanced Tilemap techniques, custom auto-tiling rules, performant level editing, and dynamic runtime tile updates.",
        publishedAt: "2025-10-04",
        category: "Game Development",
        tags: ["Unity", "Tilemap", "Auto-Tiling", "2D", "Level Design", "C#", "Procedural", "Tools"],
        featured: true,
        content: `Designing vast, seamless 2D levels for platformers and roguelites no longer means endless pixel-pushing. With Unity's Tilemap system and advanced auto-tiling, you can empower your designers to assemble polished worlds at lightning speed.

## Why Tilemaps & Auto-Tiling Matter

Basic tilemaps let you paint tiles, but advanced auto-tiling unlocks:
- True "paintbrush" speed: edges, corners, and islands blend on-the-fly
- Cleaner levels: consistent tiles and fewer art mistakes
- Procedural worldgen: auto-tiling rules apply programmatically
- Streamlining: Separate logic for terrain, decor, and collisions

## Full Setup: Project & Asset Preparation

1. Install Unity 2022.3+ and open a 2D URP Template project
2. Import 2D Tilemap Extras from Package Manager
3. Slice Your Tilesheet using the Sprite Editor
4. Create a Grid GameObject
5. Add a Tilemap as child of Grid

## Creating a Rule-based Auto-Tile

1. Create a RuleTile in your project
2. Assign all sub-sprites to the RuleTile fields
3. Define neighbor rules visually
4. Drag your RuleTile into the Tile Palette
5. Paint in the Scene

## Conclusion

Auto-tiling in Unity is a technical superpower—design faster, code smarter, and never hand-place hundreds of edge tiles again!`
    }
];

async function migrateBlogsToDatabase() {
    try {
        console.log('=== Blog Migration Script ===\n');

        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB successfully!\n');

        // Optional: Clear existing blogs
        console.log('Clearing existing blogs...');
        const deleteResult = await Blog.deleteMany({});
        console.log(`✓ Cleared ${deleteResult.deletedCount} existing blogs\n`);

        // Migrate each blog
        console.log('Migrating blogs to database...\n');
        let successCount = 0;
        let errorCount = 0;

        for (const blogData of blogsToMigrate) {
            try {
                // Calculate read time from content
                const wordCount = blogData.content.split(/\s+/).length;
                const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min

                const blog = new Blog({
                    title: blogData.title,
                    slug: blogData.slug,
                    excerpt: blogData.excerpt,
                    content: blogData.content,
                    category: blogData.category,
                    tags: blogData.tags,
                    readTime: readTime,
                    published: true, // Set all migrated blogs as published
                    featured: blogData.featured,
                    coverImage: '', // Add cover images manually later if needed
                    views: 0,
                    publishedAt: new Date(blogData.publishedAt),
                    createdAt: new Date(blogData.publishedAt),
                    updatedAt: new Date(blogData.publishedAt)
                });

                await blog.save();
                console.log(`✓ Migrated: ${blog.title}`);
                successCount++;
            } catch (error) {
                console.error(`✗ Failed to migrate blog "${blogData.title}":`, error.message);
                errorCount++;
            }
        }

        console.log(`\n=== Migration Complete ===`);
        console.log(`Successfully migrated: ${successCount} blogs`);
        console.log(`Failed: ${errorCount} blogs`);
        console.log(`Total: ${blogsToMigrate.length} blogs\n`);

        // Display summary of migrated blogs
        const allBlogs = await Blog.find({}).select('title slug published featured');
        console.log('Blogs in database:');
        allBlogs.forEach((blog, index) => {
            const status = blog.published ? '📗' : '📕';
            const featured = blog.featured ? '⭐' : '  ';
            console.log(`${index + 1}. ${status} ${featured} ${blog.title} (/${blog.slug})`);
        });

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n✓ Database connection closed.');
        process.exit(0);
    }
}

// Run the migration
console.log('Starting blog migration...\n');
migrateBlogsToDatabase();
