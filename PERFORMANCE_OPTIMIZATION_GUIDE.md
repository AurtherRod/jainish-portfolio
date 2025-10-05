# Web Performance Optimization Guide
Target: 90+ Lighthouse Score

## 1. Image Optimization Strategy

### A. Convert to WebP
```bash
# Install sharp for image conversion
npm install sharp --save-dev

# Create conversion script
node scripts/convertToWebP.js
```

### B. Responsive Images Component
Already created: `src/components/OptimizedImage.jsx`

Usage:
```jsx
<OptimizedImage 
  src="/Images/Trustopay.png"
  alt="Trustopay Platform"
  width={800}
  height={600}
  priority={false}
/>
```

### C. Image Compression
- Use TinyPNG or Squoosh.app
- Target: < 100KB per image
- Dimensions: Max 1920px width

## 2. CSS & JavaScript Optimization

### Build Optimization (package.json)
```json
"scripts": {
  "build": "GENERATE_SOURCEMAP=false react-scripts build",
  "build:analyze": "npm run build && source-map-explorer 'build/static/js/*.js'"
}
```

### Install Dependencies
```bash
npm install --save-dev source-map-explorer compression-webpack-plugin
```

## 3. Critical CSS Extraction

### Install Critical
```bash
npm install --save-dev critical
```

### Extract Critical CSS (scripts/extractCritical.js)
```javascript
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'build/',
  src: 'index.html',
  target: 'index.html',
  width: 1300,
  height: 900
});
```

## 4. Service Worker (Enhanced)
Already implemented: `public/sw.js`

## 5. CDN Setup

### Cloudflare (Recommended)
1. Sign up at cloudflare.com
2. Add domain: jainish.space
3. Update nameservers
4. Enable Auto Minify (JS, CSS, HTML)
5. Enable Brotli compression
6. Set Browser Cache TTL: 4 hours

### Alternative: AWS CloudFront
```bash
# Create CloudFront distribution
aws cloudfront create-distribution --origin-domain-name jainish.space
```

## 6. Font Loading Optimization

### Preload Fonts (index.html)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" as="style">
```

### Font Display Strategy
```css
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('fonts/inter.woff2') format('woff2');
}
```

## 7. Third-Party Script Optimization

### Defer Non-Critical Scripts
```html
<script defer src="analytics.js"></script>
```

### Use Partytown for Heavy Scripts
```bash
npm install @builder.io/partytown
```

## Performance Checklist

- [ ] All images < 100KB
- [ ] WebP format with fallback
- [ ] Lazy loading enabled
- [ ] CSS minified
- [ ] JS code-split
- [ ] Service worker active
- [ ] CDN configured
- [ ] Fonts optimized
- [ ] Lighthouse score 90+

## Monitoring Tools

- Google Lighthouse
- WebPageTest
- GTmetrix
- Chrome DevTools Performance
