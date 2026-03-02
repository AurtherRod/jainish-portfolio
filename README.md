# Jainish Gupta - Game Developer Portfolio

A modern, responsive portfolio website showcasing game development projects, technical expertise, and blog articles. Built with React, Tailwind CSS, and optimized for performance and SEO.

## 🌟 Features

- **Hero Section** - Eye-catching introduction with key highlights
- **Project Showcase** - Browse featured games and technical projects with detailed descriptions
- **Blog Section** - Technical articles and development insights
- **Experience Timeline** - Professional background and expertise
- **Playable Games** - WebGL-enabled game projects playable directly in the browser
- **Contact Section** - Easy ways to reach out
- **SEO Optimized** - Structured data, meta tags, and performance optimizations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Themed UI** - Modern glassmorphism effects with neon accents

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App / React Scripts
- **Performance**: Code splitting, lazy loading, image optimization
- **Analytics**: Facebook Pixel integration ready

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AurtherRod/jainish-portfolio.git
cd jainish-portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📦 Available Scripts

```bash
# Development
npm start              # Start dev server

# Production
npm run build          # Build for production
npm run build:compress # Build with gzip compression

# Optimization
npm run optimize           # Run all optimizations
npm run optimize:images    # Convert images to WebP
npm run optimize:critical  # Extract critical CSS

# Testing & Analysis
npm test               # Run tests
npm run build:analyze  # Analyze bundle size
npm run seo:test       # Get SEO testing URLs
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProjectsSection.jsx
│   ├── ExperienceSection.jsx
│   ├── AboutSection.jsx
│   ├── ContactSection.jsx
│   ├── FeaturedBlogsSection.jsx
│   ├── FAQSection.jsx
│   ├── OptimizedImage.jsx
│   ├── SEO.jsx
│   ├── StructuredData.jsx
│   └── FacebookPixel.jsx
├── pages/            # Page components (route-based)
│   ├── HomePage.jsx
│   ├── BlogPage.jsx
│   ├── BlogArticle.jsx
│   ├── GamesPage.jsx
│   ├── GamePlayerPage.jsx
│   └── NotFoundPage.jsx
├── data/            # Static data files
│   ├── blogs.js
│   ├── projects.js
│   ├── experience.js
│   └── faqData.js
├── hooks/           # Custom React hooks
│   └── useScrollReveal.js
├── config/          # Configuration files
│   ├── seoConfig.js
│   ├── seoKeywords.js
│   ├── pageMetadata.js
│   └── contentCalendar.js
├── utils/           # Utility functions
│   ├── seoUtils.js
│   ├── projectSchema.js
│   └── performance.js
├── constants/       # App-wide constants
│   └── index.js
└── styles/          # Global styles
    └── globals.css
```

## 🎨 Configuration Files

- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS setup
- **.env.production** - Production environment variables

## 📝 Adding Content

### Adding a New Blog Post

Edit `src/data/blogs.js` and add a new blog object:

```javascript
{
  id: 1,
  title: "Blog Post Title",
  description: "Short description for blog card",
  date: "2024-01-20",
  readTime: "5 min read",
  category: "Category Name",
  tags: ["tag1", "tag2"],
  delay: "200ms",
  content: `# Blog Content\n\nMarkdown-formatted content here...`
}
```

### Adding a New Project

Edit `src/data/projects.js`:

```javascript
{
  id: 'project-id',
  title: "Project Title",
  description: "Project description",
  image: "/Images/project.jpg",
  company: "Company Name",
  technologies: ["Tech1", "Tech2"],
  achievements: ["Achievement 1", "Achievement 2"],
  isPlayable: false,  // Set to true for WebGL games
  gamePath: "/Games/GameName/index.html"
}
```

### Adding Experience

Edit `src/data/experience.js` to update the timeline section.

## 🔍 SEO Features

- **Meta Tags**: Optimized for Open Graph and Twitter Cards
- **Structured Data**: Schema.org markup for rich snippets
- **Performance**: Optimized images, critical CSS, code splitting
- **Mobile Friendly**: Responsive design and touch-friendly UI
- **Accessibility**: ARIA labels, semantic HTML, skip navigation

## 🎮 Playing Games

Some projects include playable WebGL games embedded directly in the portfolio:

1. Navigate to a project with `isPlayable: true`
2. Click "Play Game" to launch the game in a fullscreen viewer
3. Use keyboard/mouse controls as indicated in the game

## 📊 Performance

The site includes optimization scripts:

```bash
npm run optimize           # Analyze and suggest optimizations
npm run optimize:images    # Auto-convert images to WebP format
npm run optimize:critical  # Extract critical CSS
```

**Performance targets:**
- Lighthouse Score: 90+
- Time to Interactive: <2s
- Cumulative Layout Shift: <0.1

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build/` folder ready for deployment.

### Deploy to Hosting

The built site can be deployed to:
- **Vercel** (recommended for React)
- **Netlify** (with automatic build setup)
- **GitHub Pages**
- **Traditional Web Hosting** (copy `build/` folder)

### Environment Variables

Create `.env.production` for production-specific settings:

```
REACT_APP_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
REACT_APP_API_URL=https://api.example.com
```

## 🤝 Contributing

To update or add content to the portfolio:

1. **Clone** the repository
2. **Create a branch** for your changes
3. **Make edits** to relevant data files or components
4. **Test locally** with `npm start`
5. **Build and verify** with `npm run build`
6. **Commit and push** your changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📧 Contact

- **Email**: jainish@jainish.space
- **LinkedIn**: [Jainish Gupta](https://linkedin.com/in/jainish-gupta)
- **GitHub**: [AurtherRod](https://github.com/AurtherRod)
- **Twitter**: [@jainishgupta](https://twitter.com/jainishgupta)

## 📄 License

This project is personal and not under a specific license. Please respect the intellectual property of projects and games showcased.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Web Vitals](https://web.dev/vitals/)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

**Built with ❤️ by Jainish Gupta**
