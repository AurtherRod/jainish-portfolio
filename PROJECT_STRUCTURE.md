# Project Structure Guide

A detailed breakdown of the portfolio's directory structure and what each part does.

## 📂 Directory Tree

```
jainish-portfolio/
├── public/                    # Static files served as-is
│   ├── index.html            # Main HTML entry point
│   ├── robots.txt            # SEO robots directive
│   ├── sitemap.xml           # XML sitemap for search engines
│   ├── sw.js                 # Service worker (offline support)
│   └── Images/               # Static images
│       └── GameImages/       # Game-related images
│
├── src/                      # Application source code
│   ├── index.js              # React app entry point
│   ├── App.jsx               # Root component with routing
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Footer.jsx        # Footer with links
│   │   ├── HeroSection.jsx   # Landing hero banner
│   │   ├── AboutSection.jsx  # About/bio section
│   │   ├── ExperienceSection.jsx  # Work experience timeline
│   │   ├── ProjectsSection.jsx    # Projects showcase
│   │   ├── ContactSection.jsx     # Contact information
│   │   ├── FeaturedBlogsSection.jsx # Latest blog posts
│   │   ├── FAQSection.jsx    # Frequently asked questions
│   │   ├── OptimizedImage.jsx     # Image optimization wrapper
│   │   ├── SEO.jsx           # Meta tags component
│   │   ├── StructuredData.jsx     # Schema.org markup
│   │   └── FacebookPixel.jsx      # Analytics tracking
│   │
│   ├── pages/                # Page components (route-based)
│   │   ├── HomePage.jsx      # / (main landing page)
│   │   ├── BlogPage.jsx      # /blog (blog listing)
│   │   ├── BlogArticle.jsx   # /blog/:slug (single article)
│   │   ├── GamesPage.jsx     # /projects (projects listing)
│   │   ├── GamePlayerPage.jsx # /games/:gameId (playable games)
│   │   └── NotFoundPage.jsx  # 404 error page
│   │
│   ├── data/                 # Static content data
│   │   ├── blogs.js          # Blog posts configuration
│   │   ├── projects.js       # Projects portfolio
│   │   ├── experience.js     # Work experience timeline
│   │   ├── faqData.js        # FAQ items
│   │   └── README.md         # Data structure documentation
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useScrollReveal.js # Scroll animation hook
│   │
│   ├── config/               # Configuration files
│   │   ├── seoConfig.js      # SEO settings
│   │   ├── seoKeywords.js    # Keyword mappings
│   │   ├── pageMetadata.js   # Page-specific metadata
│   │   └── contentCalendar.js # Content planning (optional)
│   │
│   ├── utils/                # Utility functions
│   │   ├── seoUtils.js       # SEO-related utilities
│   │   ├── projectSchema.js  # Schema.org helpers
│   │   └── performance.js    # Performance tracking
│   │
│   ├── constants/            # App-wide constants
│   │   └── index.js          # Animation delays, config values
│   │
│   └── styles/               # Global styles
│       └── globals.css       # Global CSS styles
│
├── scripts/                  # Build and optimization scripts
│   ├── convertToWebP.js      # Image format converter
│   ├── extractCritical.js    # Critical CSS extraction
│   └── optimize.sh           # Performance analysis script
│
├── build/                    # Production build output (generated)
│   ├── index.html            # Built HTML
│   ├── static/               # Built JS and CSS
│   │   ├── js/               # Chunked JavaScript files
│   │   └── css/              # Minified CSS
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js
│
├── node_modules/             # NPM dependencies (generated)
│
├── public/index.html         # HTML template
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency lock file
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── .gitignore                # Git ignore rules
├── .env.production           # Production environment variables
└── README.md                 # Project overview
```

## 📌 Key Directories Explained

### `/src/components`
**Purpose**: Reusable UI components used throughout the site

- **Header.jsx** - Navigation and branding
- **Footer.jsx** - Footer with social links and contact
- **Section Components** - HeroSection, AboutSection, etc. make up the home page
- **OptimizedImage.jsx** - Lazy-loading image component with fallbacks
- **SEO & Analytics** - SEO.jsx, StructuredData.jsx, FacebookPixel.jsx

### `/src/pages`
**Purpose**: Full page components that correspond to routes

- Each page handles its own SEO, layout, and data fetching
- Pages are lazy-loaded for better performance
- No direct business logic - components should be reusable

### `/src/data`
**Purpose**: Configuration and content data in JavaScript objects

**Files:**
- **blogs.js** - Array of blog post objects with content
- **projects.js** - Portfolio of projects with metadata
- **experience.js** - Timeline of work experience
- **faqData.js** - FAQ questions and answers

All data is JavaScript objects for easy consumption by React.

### `/src/config`
**Purpose**: Application-wide configuration

- **seoConfig.js** - Default SEO settings
- **seoKeywords.js** - Keyword mappings for pages
- **pageMetadata.js** - Per-page meta information
- **contentCalendar.js** - Content scheduling (optional)

### `/src/utils`
**Purpose**: Helper functions and utilities

- **seoUtils.js** - Functions for SEO meta tag generation
- **projectSchema.js** - Schema.org structured data helpers
- **performance.js** - Performance tracking and analytics

### `/src/constants`
**Purpose**: App-wide constants and configuration values

Contains things like:
- Animation delay values (used throughout components)
- Base URLs and API endpoints
- Reusable constants

### `/scripts`
**Purpose**: Node.js scripts for build optimization

- **convertToWebP.js** - Converts images to modern formats
- **extractCritical.js** - Extracts critical CSS for faster rendering
- **optimize.sh** - Analyzes and suggests optimizations

## 🔄 Data Flow

```
App.jsx (Root)
    │
    ├── Router (React Router)
    │
    ├── Pages (by route)
    │   ├── HomePage.jsx
    │   ├── BlogPage.jsx
    │   ├── GamesPage.jsx
    │   └── etc.
    │
    ├── Data Sources (src/data/)
    │   ├── blogs.js → BlogPage, BlogArticle
    │   ├── projects.js → ProjectsSection, GamesPage
    │   ├── experience.js → ExperienceSection
    │   └── faqData.js → FAQSection
    │
    └── Components (src/components/)
        ├── Layout (Header, Footer)
        └── Sections (re-used on home and specific pages)
```

## 🎨 Styling Architecture

**Tailwind CSS** is used for styling:
```
tailwind.config.js (theme config)
    ↓
src/styles/globals.css (global styles)
    ↓
Components (use Tailwind class names)
```

Custom classes defined in `globals.css`:
- `.card-hover` - Card hover effects
- `.neon-accent` - Gradient text
- `.glass-effect` - Glassmorphism background
- `.neon-border` - Glowing borders
- `.tech-tag` - Technology badge styling

## 🔄 Component Reusability Pattern

Components follow a pattern of:
1. **Presentational** - Handle UI rendering
2. **Reusable** - Accept props for configuration  
3. **Composable** - Can be combined easily

Example:
```javascript
// Reusable component
<ProjectCard 
  project={projectData}
  onClickPlay={() => {}}
/>

// Used in multiple places
// 1. ProjectsSection.jsx
// 2. GamesPage.jsx
```

## 📊 Data Structure Examples

### Blog Object
```javascript
{
  id: 1,
  title: "Blog Post Title",
  description: "Short description",
  date: "2024-01-20",
  readTime: "5 min read",
  category: "Technology",
  tags: ["tag1", "tag2"],
  delay: "200ms",
  content: "# Markdown content here"
}
```

### Project Object
```javascript
{
  id: "project-id",
  title: "Project Title",
  description: "Description",
  image: "/Images/project.jpg",
  company: "Company Name",
  technologies: ["Tech1", "Tech2"],
  achievements: ["Achievement 1"],
  isPlayable: false,
  gamePath: "/Games/GameName/index.html"
}
```

### Experience Object
```javascript
{
  id: 1,
  title: "Job Title",
  company: "Company",
  period: "Jan 2023 - Present",
  description: "Role description",
  skills: ["skill1", "skill2"]
}
```

## 🔍 How Pages Are Generated

1. **Route Definition** (App.jsx)
   ```javascript
   <Route path="/blog" element={<BlogPage />} />
   ```

2. **Data Fetching** (BlogPage.jsx)
   ```javascript
   import { blogsData } from '../data/blogs';
   ```

3. **Rendering** (BlogPage.jsx)
   ```javascript
   const BlogPage = () => (
     blogsData.map(blog => <BlogCard blog={blog} />)
   )
   ```

4. **SEO** (BlogPage.jsx)
   ```javascript
   <SEO title="Blog" description="Articles" />
   ```

## 🚀 Build Output

After `npm run build`, the build folder contains:

- **index.html** - Minified main HTML
- **static/js/** - Code-split JavaScript bundles
- **static/css/** - Minified CSS
- **sitemap.xml** - For search engines
- **robots.txt** - Robot directives
- **sw.js** - Service worker for offline support

## 📦 Key Dependencies

- **react** - UI library
- **react-router-dom** - Client-side routing
- **react-scripts** - Create React App build tools
- **tailwindcss** - Utility-first CSS framework
- **postcss** - CSS transformation

## 🔧 File Naming Conventions

- **Components**: PascalCase (Header.jsx, BlogCard.jsx)
- **Pages**: PascalCase (HomePage.jsx, BlogPage.jsx)
- **Data files**: camelCase (blogs.js, projects.js)
- **Utilities**: camelCase (seoUtils.js, projectSchema.js)
- **Styles**: globals.css (global), component-specific in component folders

---

**Understanding this structure helps in maintaining and extending the portfolio efficiently!**
