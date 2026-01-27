🎮 Jainish Gupta - Game Developer Portfolio

Live Site: jainish.space

A modern, high-performance portfolio website designed to showcase Game Development projects, interactive 3D experiments, and technical blogs. Built with a mobile-first approach using React and Tailwind CSS, featuring a custom game player and a consistent neon-cyberpunk aesthetic.

🚀 Features

🎮 Integrated Game Player: Dedicated route (/games/:gameId) to play WebGL builds directly in the browser with fullscreen support.

🎨 Cyberpunk Aesthetic: A consistent cyan/purple neon theme tailored for jainish.space.

📱 Fully Responsive: Mobile-first design architecture using Tailwind CSS.

🔍 SEO Optimized: Comprehensive meta tags, JSON-LD structured data, and Open Graph tags managed via central config.

⚡ High Performance: Optimized assets, lazy loading, and code splitting.

🧭 Smart Navigation: Auto scroll-to-top on route changes and custom 404 handling.

🛠️ Tech Stack

Core: React 18.2.0, Node.js

Routing: React Router DOM 7.9.0

Styling: Tailwind CSS 3.4.17, PostCSS 8.5.6

Deployment: Apache (custom .htaccess for client-side routing)

📁 Project Structure

src/
├── components/       # Reusable UI components (GamePlayer, Cards, Navbar)
├── pages/            # Page-level views (Home, Projects, GameView)
├── config/           # ⚙️ The "Brain" of the app
│   └── themeConfig.js # Central control for Theme, SEO, and Content
├── data/             # Static content (Project lists, Blog posts)
├── hooks/            # Custom Hooks (useScrollToTop, useScrollReveal)
├── utils/            # Helper functions
└── styles/           # Global directives


⚙️ Configuration & Customization

The entire site is data-driven via src/config/themeConfig.js.
Edit this file to instantly update:

Theme Colors: Primary, secondary, and accent colors.

SEO Metadata: Global keywords, page titles, and OG images.

Structured Data: JSON-LD schema markup for Google rich results.

Content Calendar: Upcoming blog post schedules.

🖥️ Getting Started

Prerequisites

Node.js 14+

npm or yarn

Installation

Clone the repository

git clone [https://github.com/AurtherRod/jainish-space.git](https://github.com/AurtherRod/jainish-space.git)
cd jainish-space


Install dependencies

npm install


Start development server

npm start


The app will open at http://localhost:3000.

📦 Build & Deployment

To create an optimized production build:

npm run build


⚠️ Apache Deployment Note

This project includes a specific .htaccess configuration to handle React Router on Apache servers.

It redirects all non-file/directory requests to index.html.

Ensure your hosting provider allows .htaccess overrides.

🗺️ Sitemap & Routing

Route

Description

/

Home - Hero section, skills, and featured work.

/projects

Portfolio - Full gallery of games and apps.

/games/:gameId

Game Arcade - Playable WebGL container.

/blog

DevLogs - Technical tutorials and updates.

*

404 - Custom error page with redirection.

👤 Author

Jainish Gupta - Game Developer & Systems Engineer

🌐 Website: jainish.space

💼 LinkedIn: linkedin.com/in/jainish-gupta

🐙 GitHub: @AurtherRod

<p align="center">
<i>Built with 💜 , React and AI.</i>
</p>