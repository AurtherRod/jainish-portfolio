# Getting Started

Quick reference guide to get up and running with the portfolio.

## 🚀 5-Minute Setup

```bash
# 1. Clone repository
git clone https://github.com/AurtherRod/jainish-portfolio.git
cd jainish-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# ✓ Opens http://localhost:3000
```

## 📝 Common Tasks

### Add a Blog Post
1. Open `src/data/blogs.js`
2. Add blog object to `blogsData` array
3. Increment `id` from last entry
4. Reload browser to see changes

**See** [CONTRIBUTING.md](CONTRIBUTING.md#adding-blog-posts) for full details

### Add a Project
1. Open `src/data/projects.js`
2. Add project object to array
3. Provide project image
4. Set `isPlayable: true` for games

**See** [CONTRIBUTING.md](CONTRIBUTING.md#adding-projects) for full details

### Update Personal Info
1. Edit `src/pages/HomePage.jsx` (structured data)
2. Edit `src/components/Footer.jsx` (social links)
3. Reload to preview

### Optimize Images
```bash
npm run optimize:images  # Convert to WebP format
```

### Deploy to Production
```bash
npm run build            # Create production build
npm run build:analyze    # Check bundle size
```

**See** [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options

## 🛠 Available Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run optimize` | Analyze and suggest optimizations |
| `npm run optimize:images` | Convert images to WebP |
| `npm run build:analyze` | Analyze bundle size |
| `npm run seo:test` | Get SEO testing URLs |

## 📂 Important Files

- **src/data/blogs.js** - Blog posts
- **src/data/projects.js** - Portfolio projects
- **src/data/experience.js** - Work experience
- **src/pages/HomePage.jsx** - Main landing page
- **src/components/Footer.jsx** - Footer & social links
- **tailwind.config.js** - Theme & colors

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for complete breakdown.

## 🎨 Styling

Uses [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework

**Common classes:**
- `flex` - Flexbox layout
- `grid` - Grid layout  
- `text-xl` - Font size
- `bg-blue-600` - Background color
- `hover:scale-105` - Hover effects

Edit `tailwind.config.js` to customize colors/theme.

## 🧪 Testing

### Local Testing
```bash
npm start        # Dev server
# Test in browser
```

### Production Testing
```bash
npm run build    # Create build
npx serve -s build  # Preview build locally
```

## 📊 Performance Goals

Target metrics:
- Lighthouse: 90+
- Load time: <2 seconds
- Core Web Vitals: All green

Run: `npm run optimize` to check

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Web Vitals](https://web.dev/vitals/)

## ❓ Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for common tasks
- Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) to understand codebase
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options

---

**Happy coding! 🎉**
