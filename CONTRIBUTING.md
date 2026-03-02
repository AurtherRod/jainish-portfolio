# Contributing to Jainish's Portfolio

This document provides guidelines for maintaining and updating this portfolio website.

## 📋 How to Contribute

### Updating Personal Information

**Files to modify:**
- `src/pages/HomePage.jsx` - Update structured data and personal info
- `src/components/Footer.jsx` - Social media links and contact info
- `src/data/experience.js` - Work experience and timeline

### Adding Blog Posts

1. Open `src/data/blogs.js`
2. Add a new object to the `blogsData` array:

```javascript
{
  id: 2,  // Increment from last ID
  title: "Your Blog Title",
  description: "Brief description (displayed in blog card)",
  date: "2024-01-15",  // Format: YYYY-MM-DD
  readTime: "5 min read",
  category: "Technology",
  tags: ["React", "JavaScript", "Development"],
  delay: "200ms",  // Animation delay: "0ms", "200ms", "400ms", "600ms"
  content: `# Blog Content

Write your content here using markdown-like syntax.

## Section Title

- Bullet points work
- Just use hyphens and space

\`\`\`javascript
// Code blocks are supported
const example = "Just use triple backticks";
\`\`\`

**Bold text** and regular paragraphs all work!`
}
```

**Content Formatting Guide:**
- Headings: `# H1`, `## H2`, `### H3`, `#### H4`
- Bold: `**text**`
- Lists: `- item`
- Code blocks: `` ```language\ncode\n``` ``
- Line breaks: Empty lines between paragraphs

### Adding Projects

1. Open `src/data/projects.js`
2. Add a new project object:

```javascript
{
  id: 'project-slug',  // lowercase, no spaces
  title: "Project Title",
  description: "Detailed project description",
  image: "/Images/ProjectName.jpg",
  company: "Company Name",
  technologies: ["Tech1", "Tech2", "Tech3"],
  delay: ANIMATION_DELAYS.MEDIUM,  // Use constants
  achievements: [
    "Key achievement 1",
    "Key achievement 2",
    "Key achievement 3"
  ],
  isPlayable: false,  // Set true for WebGL games
  gamePath: "/Games/ProjectName/index.html",  // Required if isPlayable: true
  aspectRatio: "landscape"  // landscape or portrait for games
}
```

**Available animation delays:**
```javascript
ANIMATION_DELAYS.NONE     // "0ms"
ANIMATION_DELAYS.SHORT    // "200ms"
ANIMATION_DELAYS.MEDIUM   // "400ms"
ANIMATION_DELAYS.LONG     // "600ms"
```

### Adding Experience/Skills

1. Open `src/data/experience.js`
2. Update the timeline array with new positions:

```javascript
{
  id: 1,
  title: "Job Title",
  company: "Company Name",
  period: "Jan 2023 - Present",
  description: "Brief role description",
  skills: ["Skill1", "Skill2", "Skill3"]
}
```

### Adding FAQ Items

1. Open `src/data/faqData.js`
2. Add FAQ objects:

```javascript
{
  id: 1,
  question: "Your question here?",
  answer: "Your detailed answer here."
}
```

## 🎨 Component Updates

### Modifying Sections

Core sections are in `src/components/`:
- **HeroSection.jsx** - Main landing introduction
- **AboutSection.jsx** - About/bio section
- **ExperienceSection.jsx** - Timeline and skills
- **ProjectsSection.jsx** - Project showcase
- **FeaturedBlogsSection.jsx** - Latest blog posts
- **ContactSection.jsx** - Contact form/info
- **FAQSection.jsx** - FAQ section
- **Footer.jsx** - Footer links and info

### Component Props Pattern

Most components accept consistent props:
```javascript
<SectionComponent 
  title="Section Title"
  description="Section description"
  id="section-id"  // For linking
/>
```

## 🔍 SEO Updates

### Update Meta Information

Edit `src/config/pageMetadata.js`:
```javascript
export const pageMetadata = {
  home: {
    title: "Your New Title",
    description: "Your new description",
    keywords: ["keyword1", "keyword2"]
  }
}
```

### Update Structured Data

In `src/pages/HomePage.jsx`, update the structured data object with:
- Name, title, description
- Social profiles
- Organization information
- Skills and expertise

## 🖼️ Image Management

### Image Optimization

Use the provided optimization script:
```bash
npm run optimize:images  # Convert images to WebP
```

**Image Best Practices:**
- Use WebP format when possible
- Provide fallback JPG/PNG
- Use `OptimizedImage.jsx` component:

```javascript
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage 
  src="/Images/project.jpg"
  alt="Project description"
  width={400}
  height={300}
  loading="lazy"
/>
```

## 🧪 Testing

### Local Testing

```bash
# Start dev server
npm start

# Test in browser
# Visit http://localhost:3000

# Check specific pages:
# http://localhost:3000/blog
# http://localhost:3000/projects
# http://localhost:3000/games
```

### Build Testing

```bash
# Build production bundle
npm run build

# Analyze bundle size
npm run build:analyze

# Test SEO
npm run seo:test
```

## 📊 Performance Checklist

Before pushing changes:

- [ ] Run `npm run optimize` to check performance
- [ ] Verify images are compressed/optimized
- [ ] Check bundle size with `npm run build:analyze`
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check spelling and grammar

## 🚀 Deployment Steps

1. **Make your changes** in a local branch
2. **Test locally**: `npm start` and `npm run build`
3. **Verify**: Browse the built site, check for issues
4. **Commit** with clear messages:
   ```bash
   git add .
   git commit -m "Add: New blog post on React optimization"
   ```
5. **Push**: `git push origin feature-branch`
6. **Deploy**: Push to main branch triggers automatic deployment

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Adding new content
git commit -m "Add: New blog post on game physics"
git commit -m "Add: Racecade project showcase"

# Updating existing content  
git commit -m "Update: Refresh experience timeline"
git commit -m "Update: Fix blog post typos"

# Fixing issues
git commit -m "Fix: Mobile responsive layout issue"
git commit -m "Fix: SEO meta tags for home page"

# Performance improvements
git commit -m "Perf: Optimize hero section images"
git commit -m "Perf: Extract critical CSS"
```

## 🔗 Important Files to Know

| File | Purpose |
|------|---------|
| `src/data/blogs.js` | Blog posts content |
| `src/data/projects.js` | Project showcase data |
| `src/data/experience.js` | Work experience/timeline |
| `src/data/faqData.js` | FAQ items |
| `src/config/seoConfig.js` | SEO configuration |
| `src/pages/HomePage.jsx` | Main landing page |
| `tailwind.config.js` | Styling configuration |
| `package.json` | Dependencies and scripts |

## ❓ Common Questions

**Q: How do I add a new page?**
A: Create a new file in `src/pages/`, add a route in `src/App.jsx`, and link it from `Header.jsx`.

**Q: Can I change colors/styling?**
A: Yes! Edit `tailwind.config.js` for theme colors or `src/styles/globals.css` for global styles.

**Q: How do I add a playable game?**
A: Set `isPlayable: true` in the project object and provide the `gamePath` to your WebGL build's index.html.

**Q: How do analytics work?**
A: Add your Facebook Pixel ID to `src/App.jsx`. The FacebookPixel component tracks page views automatically.

## 📞 Support

For questions or issues:
- Check existing documentation first
- Review similar entries in data files
- Test changes locally before deploying

---

**Thank you for maintaining this portfolio! 🚀**
