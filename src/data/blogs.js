export const blogsData = [
    {
        id: 1,
        title: "WebSockets vs. REST APIs: Choosing the Right Tool for Your Unity Game",
        description: "A practical comparison between WebSockets and REST APIs for game developers. Learn when to use each for features like leaderboards, real-time multiplayer, and data streaming in Unity, based on real-world project experience.",
        date: "2025-05-15",
        readTime: "12 min read",
        category: "Game Development",
        tags: ["Unity", "Backend", "WebSockets", "REST API", "Node.js", "C#"],
        delay: "100ms",
        content: `
When you decide to connect your Unity game to a server, you're faced with a critical architectural choice: how will they communicate? The two leading contenders for this job are REST APIs and WebSockets. Choosing the wrong one can lead to laggy gameplay or an inefficient, overloaded server.

[cite_start]Having used both extensively in professional projects—from REST APIs in a blockchain game [cite: 16] [cite_start]to WebSockets in high-fidelity industrial simulations [cite: 23, 24]—I've learned that the right choice depends entirely on the *type* of communication your game needs.


## REST APIs: The Reliable Messenger

Think of a REST API as sending a letter. You write a request, send it, and wait for a response. Once the response arrives, the conversation is over until you send a new letter.

It's a client-server model based on HTTP requests and responses. The client (your Unity game) asks for something (e.g., **GET** player data), and the server (your Node.js backend) responds. It's stateless, meaning each request is independent.

**When to Use REST in Unity:**
* **Leaderboards:** Submitting a score at the end of a round.
* **Player Authentication:** Logging in a user.
* **In-Game Store:** Fetching item data.
* [cite_start]**Inventory Management:** Saving or loading a player's inventory[cite: 17].

**Example: Fetching Player Data with C#**
\`\`\`csharp
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class APIManager : MonoBehaviour
{
    public IEnumerator GetPlayerData(string playerId)
    {
        string url = $"http://yourapi.com/players/{playerId}";
        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {
            yield return www.SendWebRequest();

            if (www.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError("Error fetching player data: " + www.error);
            }
            else
            {
                string jsonData = www.downloadHandler.text;
                Debug.Log("Received: " + jsonData);
                // Process your player data JSON here
            }
        }
    }
}
\`\`\`



## WebSockets: The Live Conversation

Think of a WebSocket as a telephone call. You establish a connection, and the line stays open. Both you and the server can talk freely and instantly without having to redial each time.

It provides a persistent, bidirectional communication channel. Once connected, both the client and server can send messages to each other with very low latency.

**When to Use WebSockets in Unity:**
* **Real-Time Multiplayer:** Sending player positions and actions every frame.
* **Live Chat Systems:** Instantly delivering messages to all players in a lobby.
* [cite_start]**Real-Time Data Streaming:** Sending live input from a controller to a server[cite: 24].
* **Live Events:** The server pushing an event to all connected clients (e.g., "A world boss has spawned!").

**Conceptual Example: Connecting with C#**
*(Note: This requires a third-party library like websocket-sharp)*
\`\`\`csharp
using WebSocketSharp;

public class SocketManager
{
    private WebSocket ws;

    public void ConnectToServer()
    {
        ws = new WebSocket("ws://yourserver.com/game");

        ws.OnMessage += (sender, e) => {
            Debug.Log("Message received from server: " + e.Data);
            // Handle real-time game events here
        };

        ws.Connect();
    }

    public void SendMessage(string message)
    {
        if (ws.IsAlive)
        {
            ws.Send(message);
        }
    }
}
\`\`\`


## Head-to-Head Comparison

| Feature | REST API | WebSocket |
|---------|----------|----------|
| **Connection** | Stateless, request-response | Persistent, stateful |
| **Communication** | Client-initiated (unidirectional) | Server or Client-initiated (bidirectional) |
| **Latency** | Higher (connection setup per request) | Very Low (connection is always open) |
| **Best For** | Asynchronous data (profiles, scores) | Real-time data (chat, multiplayer) |

## The Hybrid Approach: Using Both

You don't have to choose just one! The most powerful architecture often uses both.

A common pattern is to use a **REST API** for stateless actions like user login, fetching initial game configuration, or accessing an in-game shop. Then, once the player enters a live match, the client opens a **WebSocket** connection to the game server for all the low-latency, real-time gameplay communication.

## Conclusion

The choice is simple when you focus on the job to be done:
-   For data that can wait, like fetching a profile or saving a score, **use a REST API**.
-   For data that can't wait, like player movement or chat messages, **use a WebSocket**.

By understanding the strengths of each tool, you can build more responsive, efficient, and scalable connected games.
`
    },
    {
        "id": 2,
        "title": "Building a Scalable Game Backend with Node.js and MongoDB",
        "description": "A developer's guide to designing a cheat-resistant and scalable game backend using Node.js and MongoDB, focusing on an event-driven architecture to ensure fair and verifiable scoring.",
        "date": "2025-06-12",
        "readTime": "15 min read",
        "category": "Backend",
        "tags": ["Node.js", "MongoDB", "Security", "Game Development", "Scalability", "Architecture"],
        "delay": "200ms",
        "content": `
A modern game's success often hinges on its backend—the invisible engine that drives leaderboards, manages player data, and ensures a fair playing field. But a common vulnerability lies in how games handle scoring. Simply letting the client send a final score is an open invitation for cheating. A truly robust backend must be built for security and scalability from the ground up.

[cite_start]Throughout my experience constructing backends for applications ranging from a 2D blockchain game to high-fidelity industrial simulations, I've learned that the most reliable architecture is one that doesn't blindly trust the client[cite: 18, 23]. Instead, the server should be the ultimate source of truth.

***

## The Problem with Trusting the Client 🤨

A simple architecture where the game client sends its final score to the server is easy to implement but fundamentally insecure. A cheater can easily bypass the game's logic and send a fake request with an impossibly high score. This ruins the competitive integrity of your game.

The solution is to shift the responsibility. The client's job is not to report the score; its job is to report **what happened**. The server then calculates the score based on this stream of events.

***

## Architecture for a Cheat-Resistant Backend 🛡️

We'll use an **event-sourcing** model. During a level, the client will send a series of time-stamped events to the server. The server validates these events and, at the end of the session, calculates the final score. This makes it incredibly difficult to cheat because a fraudulent score would require a perfectly timed and logical sequence of fake events.

**Our Core Technologies:**
* [cite_start]**Node.js**: Perfect for handling numerous small, concurrent event requests from players[cite: 10].
* [cite_start]**MongoDB**: Its flexible document structure is ideal for storing varied game events and session data[cite: 12].

***

## Practical Example: Event-Driven Scoring Service

Let's design a system with three key endpoints.

### 1. Data Models (Mongoose)

First, we need schemas to represent a game session and the events within it.

\`\`\`javascript
const mongoose = require('mongoose');

// Tracks a single playthrough of a level
const gameSessionSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  levelId: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['in-progress', 'completed', 'invalid'], default: 'in-progress' }
});

// Stores a single, validated event from the client
const gameEventSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameSession', required: true, index: true },
  eventType: { type: String, required: true }, // e.g., 'checkpoint_reached', 'enemy_defeated'
  eventData: { type: mongoose.Schema.Types.Mixed }, // e.g., { enemyId: 'goblin_1' }
  timestamp: { type: Date, default: Date.now }
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
const GameEvent = mongoose.model('GameEvent', gameEventSchema);
\`\`\`

### 2. API Endpoints (Express)

Now, we create the endpoints to manage the session and its events.

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// 1. START a new game session
app.post('/session/start', async (req, res) => {
  const { playerId, levelId } = req.body;
  const session = new GameSession({ playerId, levelId });
  await session.save();
  res.send({ sessionId: session._id }); // Client must use this ID for all subsequent events
});

// 2. SEND a game event during the level
app.post('/session/event', async (req, res) => {
  const { sessionId, eventType, eventData } = req.body;
  
  // SERVER-SIDE VALIDATION
  // Is the session valid and in-progress?
  // Is the time since the last event plausible?
  // Is this event logical based on previous events?
  // If validation fails, mark the session as 'invalid'.
  
  const event = new GameEvent({ sessionId, eventType, eventData });
  await event.save();
  res.status(200).send({ message: 'Event received' });
});

// 3. END the game session and calculate the score
app.post('/session/end', async (req, res) => {
  const { sessionId } = req.body;
  
  // Fetch all events for this session, sorted by time
  const events = await GameEvent.find({ sessionId }).sort({ timestamp: 'asc' });
  
  // SERVER-SIDE SCORE CALCULATION
  let finalScore = 0;
  const scoreRules = { 'checkpoint_reached': 100, 'enemy_defeated': 50 };
  
  for (const event of events) {
    if (scoreRules[event.eventType]) {
      finalScore += scoreRules[event.eventType];
    }
  }
  
  // Mark session as completed and save the score to the player's profile
  await GameSession.findByIdAndUpdate(sessionId, { status: 'completed' });
  // await Player.findByIdAndUpdate(playerId, { $max: { highScore: finalScore } });

  res.send({ finalScore });
});

app.listen(3000, () => console.log('Secure game server running...'));
\`\`\`

***

## Conclusion ✅

By shifting from a trust-based model to an event-driven, verifiable one, you create a much more secure and fair environment for your players. This architecture not only prevents the most common forms of cheating but also provides you with a rich stream of analytics data to understand player behavior. [cite_start]Building a **scalable system architecture** [cite: 12] means planning for both player load and security threats from day one.
`
    },
    {
        "id": 3,
        "title": "Why I Chose Flutter and Node.js for My Startups",
        "description": "An inside look at the crucial technology stack decisions made as a Co-Founder & CTO, detailing the use of Node.js for a secure Fintech backend and Flutter for a mobile Ed-Tech app.",
        "date": "2025-07-12",
        "readTime": "15 min read",
        "category": "Architecture",
        "tags": ["Flutter", "Node.js", "Startup", "CTO", "Ed-Tech", "Fintech"],
        "delay": "300ms",
        "content": `
As a Co-Founder and CTO, one of the most impactful decisions you'll make is choosing the technology stack. This choice dictates your development speed, scalability, and ability to hire. Having directed the technological vision for startups in two different demanding sectors—Ed-Tech with Find and Analyze Pvt. Ltd. and Fintech with Trustopay Innovations Pvt. Ltd.—I've consistently relied on Node.js for the backend, and in the case of our mobile-first Ed-Tech platform, Flutter for the front end.

Here's a breakdown of why this combination proved so effective.

***

## Why Node.js for the Backend? (The Universal Foundation) 

Across both an educational platform and a financial one, the backend needs to be fast, reliable, and scalable. Node.js was the clear winner for several reasons.

* **Performance and Scalability**: Node.js's non-blocking, event-driven architecture is a massive advantage. It can efficiently handle many concurrent connections, which was essential for scaling our Ed-Tech app, "Class and Class," to over 500 classes. This same performance is critical in a Fintech environment. For Trustopay, this meant architecting a backend capable of securely processing every stage of the escrow transaction lifecycle.
* **Speed of Development**: For a startup with a small, agile team, development speed is everything. The vast npm ecosystem provides ready-made modules for almost any functionality, drastically reducing development time.
* **Versatility**: The fact that Node.js is a robust choice for both an Ed-Tech platform and a secure Fintech backend speaks to its incredible versatility. It's a powerful general-purpose tool that doesn't lock you into a specific niche.

***

## The Fintech Frontline: The Trustopay App 

With Trustopay, the technological vision was to solve a fundamental problem in online transactions and say goodbye to the fear of "payment not received" or "item not delivered".

The result is Trustopay, India’s go-to platform for secure transactions between buyers and sellers. It’s built for everyone, from **buyers on OLX and Facebook Marketplace** to **freelancers and small businesses**. The process is simple:

1.  A user **Creates a Deal**, adding terms and details.
2.  The buyer **Pays Securely** to Trustopay, where the payment is held.
3.  The seller completes the exchange by delivering the product or service.
4.  The buyer confirms delivery, and Trustopay **Releases the Funds** to the seller.

As CTO, my role was to spearhead the development of the core financial operations backend that powers these secure features. Every step, from creating a deal to the final fund release, is processed through the systems we built, with MongoDB's lifecycle managed for optimal performance and data integrity.

***

## The Ed-Tech Experience: The "Class and Class" App 

For my educational startup, Find and Analyze, we needed to build a high-quality mobile application for both iOS and Android without the budget for two separate native teams.

* **Cross-Platform with a Single Codebase**: This is Flutter's killer feature. We developed the "Class and Class" mobile application from a single codebase, which allowed our small team of four developers to be incredibly efficient.
* **Fast, Expressive UI Development**: Flutter's "hot reload" feature is a game-changer for iteration speed, allowing us to build a polished, user-friendly interface for students and teachers quickly.
* **Native Performance**: Flutter compiles to native code, ensuring the final application is smooth and responsive—a non-negotiable for a good user experience.

***

## Conclusion 

The decision to use Node.js as a versatile backend and Flutter for mobile development was pivotal to my ability to launch and scale efficiently. For Trustopay, Node.js provides the secure, transactional backbone needed for an escrow service. For my Ed-Tech venture, it was the perfect counterpart to a Flutter mobile app, allowing a small team to build big things. These choices are a testament to building a strong, adaptable technological foundation.
`
    },
    {
        "id": 4,
        "title": "How to Build a Custom In-Game Inventory System from Scratch",
        "description": "A full-stack guide to creating a secure, persistent in-game inventory system using Unity, C#, Node.js, and MongoDB, based on my experience developing the backend for the blockchain game 'Racecade'.",
        "date": "2025-09-12",
        "readTime": "16 min read",
        "category": "Game Development",
        "tags": ["Unity", "C#", "Node.js", "MongoDB", "Full-Stack", "Game Design"],
        "delay": "2200ms",
        "content": `
An inventory system is the heart of many games, from RPGs to shooters. It’s where players store their hard-earned loot, customize their characters, and engage with the game's economy. However, building an inventory that is both user-friendly and secure is a significant challenge. When I developed "Racecade," a 2D blockchain game, I constructed the entire backend, including the in-game inventory system, using Node.js and MongoDB. This experience taught me the importance of a robust server-side architecture.

This guide will walk you through building a persistent, full-stack inventory system from scratch, separating client-side presentation from server-side logic.

***

## The Architecture: Why Full-Stack?

A common mistake is to handle the entire inventory on the game client. This is insecure and makes it easy for players to cheat by manipulating local game files to give themselves items. A secure architecture consists of two parts:

1.  **The Server (Node.js & MongoDB)**: This is the single source of truth. It stores what items a player *actually* owns and validates all actions.
2.  **The Client (Unity & C#)**: This is responsible for displaying the inventory to the player and sending requests to the server when the player wants to do something (like use a potion or equip a weapon).

***

## Part 1: The Server-Side Backend (Node.js)

First, we'll define the data structure in MongoDB and create the API endpoints.

### 1. The MongoDB Schema (Mongoose)

We need a flexible schema that can handle different types of items. A player's inventory is essentially an array of items.

\`\`\`javascript
const mongoose = require('mongoose');

const playerInventorySchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true, index: true },
  items: [{
    itemId: { type: String, required: true }, // A unique ID for the item, e.g., "potion_health_small"
    quantity: { type: Number, required: true, default: 1 }
  }]
});

const PlayerInventory = mongoose.model('PlayerInventory', playerInventorySchema);
\`\`\`

### 2. The API Endpoints (Express)

We need endpoints to fetch, add, and remove items. All logic is validated on the server.

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

// GET a player's full inventory
app.get('/inventory/:playerId', async (req, res) => {
  const inventory = await PlayerInventory.findOne({ playerId: req.params.playerId });
  if (!inventory) {
    return res.status(404).send({ error: 'Inventory not found' });
  }
  res.send(inventory);
});

// POST to add an item to the inventory
app.post('/inventory/add', async (req, res) => {
  const { playerId, itemId, quantity } = req.body;
  
  // SERVER-SIDE VALIDATION: Did the player actually earn this item?
  // (e.g., check if they just completed a quest or opened a loot box)
  
  const inventory = await PlayerInventory.findOne({ playerId });
  const itemIndex = inventory.items.findIndex(item => item.itemId === itemId);

  if (itemIndex > -1) {
    // If item exists, increase quantity
    inventory.items[itemIndex].quantity += quantity;
  } else {
    // If new item, add to the array
    inventory.items.push({ itemId, quantity });
  }
  
  await inventory.save();
  res.send(inventory);
});
\`\`\`

***

## Part 2: The Client-Side Frontend (Unity)

Now, let's create the Unity components to display and interact with this data.

### 1. C# Data Structures

Create C# classes that mirror the JSON structure from our API.

\`\`\`csharp
using System;
using System.Collections.Generic;

[Serializable]
public class InventoryItem
{
    public string itemId;
    public int quantity;
}

[Serializable]
public class PlayerInventoryData
{
    public string playerId;
    public List<InventoryItem> items;
}
\`\`\`

### 2. The Inventory UI

In the Unity Editor, create a simple UI for your inventory. A common approach is a grid of "slots." Each slot is a UI Panel or Button that will display an item's icon and quantity. [Image of a grid-based game inventory UI]

### 3. Communicating with the Server

This C# script uses a Coroutine and **UnityWebRequest** to fetch the inventory data and update the UI.

\`\`\`csharp
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class InventoryManager : MonoBehaviour
{
    public Transform inventorySlotsParent; // The parent object for your UI slots

    public void FetchInventory(string playerId)
    {
        StartCoroutine(GetInventoryRequest(playerId));
    }

    private IEnumerator GetInventoryRequest(string playerId)
    {
        string url = $"http://your-server.com/inventory/{playerId}";
        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.Success)
            {
                string jsonData = www.downloadHandler.text;
                PlayerInventoryData inventoryData = JsonUtility.FromJson<PlayerInventoryData>(jsonData);
                
                UpdateInventoryUI(inventoryData.items);
            }
            else
            {
                Debug.LogError("Error fetching inventory: " + www.error);
            }
        }
    }

    private void UpdateInventoryUI(System.Collections.Generic.List<InventoryItem> items)
    {
        // Logic to clear existing slots
        // Loop through the 'items' list
        // For each item, find a free UI slot
        // Set the slot's icon and quantity text based on the item data
        Debug.Log($"Fetched {items.Count} items.");
    }
}
\`\`\`

***

## Conclusion 

By building your inventory system with a dedicated backend, you create a secure and persistent experience
for your players. This approach not only enhances gameplay but also simplifies future updates and maintenance.`
    },
    {
        "id": 5,
        "title": "How to Build Custom Editors and Level Generators in Unity",
        "description": "A practical guide to Unity Editor Scripting. Learn how to create custom inspectors and standalone editor windows to build powerful level generators and workflow tools, based on my experience developing 'Racecade'.",
        "date": "2025-09-13",
        "readTime": "14 min read",
        "category": "Game Development",
        "tags": ["Unity", "C#", "Editor Scripting", "Tools", "Level Design", "Workflow"],
        "delay": "2400ms",
        "content": `
As game developers, we spend countless hours inside the Unity Editor. But what if you could make the editor work for *you*? Repetitive tasks like placing objects, configuring prefabs, and setting up levels can slow down development and introduce human error. The solution is Unity Editor Scripting.

In projects like the blockchain game "Racecade," I employed editor scripting to refine core game mechanics and, most importantly, to handle procedural level generation. This turned hours of manual work into a single button click. This guide will introduce you to these powerful, productivity-boosting techniques.

***

## What is Editor Scripting?

Editor scripting is the practice of writing C# code that extends the Unity Editor's functionality. This code runs inside the editor itself, not in your final game. To begin, any script that uses editor-only APIs **must be placed inside a folder named "Editor"** in your project's **Assets** directory.

***

## Your First Tool: The Custom Inspector

A custom inspector allows you to change how a component's properties are displayed in the Inspector window. You can add buttons, sliders, and custom visualizations to make configuring your game objects easier and more intuitive.

**1. The Component Script (LevelManager.cs):**
\`\`\`csharp
using UnityEngine;

public class LevelManager : MonoBehaviour
{
    public int obstacleCount;
    public GameObject obstaclePrefab;

    public void GenerateObstacles()
    {
        // Clear existing obstacles first to avoid duplicates
        for (int i = transform.childCount - 1; i >= 0; i--)
        {
            DestroyImmediate(transform.GetChild(i).gameObject);
        }

        // Generate new ones at random positions
        for (int i = 0; i < obstacleCount; i++)
        {
            Vector3 randomPosition = new Vector3(Random.Range(-10f, 10f), 0, Random.Range(-10f, 10f));
            Instantiate(obstaclePrefab, randomPosition, Quaternion.identity, transform);
        }
        Debug.Log($"Generated {obstacleCount} obstacles!");
    }
}
\`\`\`

**2. The Custom Editor Script (LevelManagerEditor.cs, in an "Editor" folder):**
\`\`\`csharp
using UnityEngine;
using UnityEditor;

[CustomEditor(typeof(LevelManager))]
public class LevelManagerEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // Draw the default inspector fields (obstacleCount, obstaclePrefab)
        DrawDefaultInspector();

        // Get a reference to the LevelManager script instance
        LevelManager levelManager = (LevelManager)target;

        // Add a space for better layout
        EditorGUILayout.Space();

        // Add a button to the inspector that calls our public method
        if (GUILayout.Button("Generate Obstacles"))
        {
            levelManager.GenerateObstacles();
        }
    }
}
\`\`\`
Now, when you select a GameObject with the **LevelManager** component, you'll see a "Generate Obstacles" button directly in the inspector. No more having to run the game to test your generation logic!

***

## Building a Standalone Level Generator Window

For more complex tools, a custom editor window is the way to go. These are standalone windows you can dock just like the Scene view or Inspector. 

This script creates a new menu item that opens our custom tool.

\`\`\`csharp
// LevelGeneratorWindow.cs (Must be in an "Editor" folder)
using UnityEngine;
using UnityEditor;

public class LevelGeneratorWindow : EditorWindow
{
    private int roadSegmentCount = 10;
    private GameObject roadSegmentPrefab;
    private float segmentLength = 5.0f;

    [MenuItem("Tools/Level Generator")]
    public static void ShowWindow()
    {
        GetWindow<LevelGeneratorWindow>("Level Generator");
    }

    private void OnGUI()
    {
        GUILayout.Label("Road Generation Settings", EditorStyles.boldLabel);

        roadSegmentCount = EditorGUILayout.IntSlider("Road Segments", roadSegmentCount, 1, 100);
        segmentLength = EditorGUILayout.FloatField("Segment Length", segmentLength);
        roadSegmentPrefab = (GameObject)EditorGUILayout.ObjectField("Road Prefab", roadSegmentPrefab, typeof(GameObject), false);

        EditorGUILayout.Space();

        if (GUILayout.Button("Generate Road"))
        {
            GenerateRoad();
        }
    }

    private void GenerateRoad()
    {
        if (roadSegmentPrefab == null)
        {
            Debug.LogError("Road Prefab is not assigned!");
            return;
        }

        GameObject roadParent = new GameObject("GeneratedRoad");
        for (int i = 0; i < roadSegmentCount; i++)
        {
            Vector3 position = new Vector3(0, 0, i * segmentLength);
            Instantiate(roadSegmentPrefab, position, Quaternion.identity, roadParent.transform);
        }
    }
}
\`\`\`
After adding this script, you'll find a new **Tools > Level Generator** option in Unity's top menu bar. This gives you a dedicated interface for your level-building logic, centralizing control and dramatically improving your workflow.

***

## Conclusion

Editor scripting is an essential skill for any serious Unity developer. By investing a small amount of time into building custom tools, you can automate repetitive tasks, reduce human error, and accelerate your entire development process. Whether you're managing complex procedural systems or just simplifying object placement, custom editor tools are a game-changer for productivity.
`
    }
];