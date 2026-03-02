# Deployment Guide

Complete guide for building and deploying your portfolio to production.

## 🔨 Building for Production

### Step 1: Prepare Your Code

```bash
# Ensure all changes are committed
git status

# Run tests (if available)
npm test
```

### Step 2: Build the Project

```bash
# Standard build
npm run build

# Build with compression
npm run build:compress
```

This creates an optimized `build/` folder with:
- Minified JavaScript
- Optimized CSS
- Compressed images
- No source maps
- Optimized bundle chunks

### Step 3: Verify Build Locally

```bash
# Preview production build locally
npx serve -s build

# Visit http://localhost:3000
# Test all pages and features
```

### Step 4: Analyze Bundle Size

```bash
npm run build:analyze
```

Check for:
- Large dependencies
- Duplicate packages
- Unnecessary code

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for React)

**Setup:**
1. Sign up for free at [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import repository

**Configuration:**
- Framework: Next.js (choose React/SPA if not Next.js)
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Automatic Deployments:**
- Main branch pushes trigger auto-deploy
- Preview deployments for pull requests
- Zero configuration needed

**Deploy:**
```bash
# Using Vercel CLI
npm install -g vercel
vercel
```

### Option 2: Netlify

**Setup:**
1. Sign up at [netlify.com](https://netlify.com)
2. Connect GitHub
3. Import repository

**Configuration:**
```toml
# netlify.toml
[build]
command = "npm run build"
publish = "build"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

**Deploy:**
```bash
# Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages

**Setup:**
1. Update `package.json`:
```json
{
  "homepage": "https://your-username.github.io/jainish-portfolio"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Deploy:**
```bash
npm run deploy
```

Site will be live at: `https://your-username.github.io/jainish-portfolio`

### Option 4: Traditional Web Hosting (Cpanel/FTP)

**Setup:**
1. Build the project: `npm run build`
2. Upload `build/` folder contents via FTP to `public_html/`
3. Test the site

**Important - Add .htaccess for routing:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 5: Docker

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

**Build and Run:**
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🔒 Environment Variables

### Production Environment

Create `.env.production`:
```
REACT_APP_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENVIRONMENT=production
```

Used in code:
```javascript
const pixelId = process.env.REACT_APP_FACEBOOK_PIXEL_ID;
```

## 🔍 Pre-Deployment Checklist

### Content
- [ ] Update all personal information
- [ ] Verify all project descriptions are accurate
- [ ] Check blog posts for typos and formatting
- [ ] Update social media links
- [ ] Review experience timeline dates
- [ ] Verify contact information

### Security
- [ ] No sensitive data in code
- [ ] No API keys in repository
- [ ] SSL certificate configured
- [ ] Environment variables properly set

### Performance
- [ ] Run `npm run optimize`
- [ ] Check bundle size with `npm run build:analyze`
- [ ] Compress images with `npm run optimize:images`
- [ ] Test on slow network (Chrome DevTools)
- [ ] Lighthouse score 90+

### SEO
- [ ] Meta tags properly configured
- [ ] Structured data validates at [schema.org](https://validator.schema.org/)
- [ ] sitemap.xml present
- [ ] robots.txt configured
- [ ] All images have alt text
- [ ] Mobile-friendly test passes

### Functionality
- [ ] Test all links work
- [ ] Verify all pages load
- [ ] Test contact form
- [ ] Check playable games
- [ ] Test navigation on mobile
- [ ] Verify forms and interactions

### Analytics
- [ ] Facebook Pixel ID added
- [ ] Google Analytics configured (if used)
- [ ] Conversion events set up
- [ ] UTM parameters planned

## 📊 Post-Deployment Testing

### Google Search Console
1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership (via sitemap or with meta tag)
3. Submit sitemap.xml
4. Monitor indexing status

### Bing Webmaster Tools
1. Register at [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site
3. Submit sitemap

### PageSpeed Testing
```bash
npm run seo:test
```

Or test at:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### SEO Validation
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org Validator](https://validator.schema.org/)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: build
          path: build/
```

## 🐛 Troubleshooting Deployments

### Issue: Blank page after deployment

**Solution:**
- Check browser console for errors
- Verify build folder is correct
- Check routing configuration (.htaccess for traditional hosting)
- Verify file paths are absolute from root

### Issue: Routes not working

**Solution:**
- Ensure 404.html redirects to index.html
- Check .htaccess is properly configured
- Verify routing setup in App.jsx

### Issue: Images not loading

**Solution:**
- Check relative vs absolute paths
- Verify images are in public folder
- Check CORS settings if using CDN
- Ensure image extensions are lowercase

### Issue: Slow performance

**Solution:**
- Run `npm run optimize`
- Compress JavaScript and CSS
- Enable gzip compression
- Set up caching headers
- Use CDN for static assets

### Issue: SEO not working

**Solution:**
- Verify meta tags in HTML head
- Check structured data with validator
- Ensure sitemap is properly configured
- Test with Google Search Console

## 📈 Monitoring Post-Deployment

### Setup Monitoring

1. **Google Analytics**
   - Track page views and user behavior
   - Monitor conversion goals
   - Analyze traffic sources

2. **Facebook Pixel**
   - Track conversions
   - Build audiences for advertising
   - Measure ROI

3. **Error Tracking**
   - Set up error logging (e.g., Sentry)
   - Monitor performance issues
   - Get alerted on problems

4. **Uptime Monitoring**
   - Use [UptimeRobot](https://uptimerobot.com/) or similar
   - Get alerts if site goes down

## 🔄 Updating After Deployment

### Making Updates

1. Make changes locally
2. Test with `npm start`
3. Build with `npm run build`
4. Test production build locally
5. Commit and push to main branch
6. CI/CD automatically deploys

### Rollback Process

If deployment has issues:
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or deploy a previous version
# (depends on hosting platform)
```

---

**Your portfolio is now production-ready! 🚀**
