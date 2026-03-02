#!/bin/bash

# Performance Optimization Script for jainish.space

echo "🚀 Starting Performance Optimization..."

# 1. Build the project
echo "📦 Building project..."
npm run build

# 2. Analyze bundle size
echo "📊 Analyzing bundle size..."
if command -v source-map-explorer &> /dev/null; then
    npm run build:analyze
else
    echo "⚠️  source-map-explorer not installed. Install with: npm install -g source-map-explorer"
fi

# 3. Check for large files
echo "🔍 Checking for large files..."
find build/static -type f -size +100k -exec ls -lh {} \; | awk '{print $9 ": " $5}'

# 4. Compress static assets
echo "🗜️  Compressing assets..."
if command -v gzip &> /dev/null; then
    find build/static/js -name "*.js" ! -name "*.gz" -exec gzip -k -f {} \;
    find build/static/css -name "*.css" ! -name "*.gz" -exec gzip -k -f {} \;
    echo "✅ Compression complete"
else
    echo "⚠️  gzip not available"
fi

# 5. Generate performance report
echo "📈 Performance Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total JS size: $(du -sh build/static/js | cut -f1)"
echo "Total CSS size: $(du -sh build/static/css | cut -f1)"
echo "Total Images size: $(du -sh build/static/media 2>/dev/null | cut -f1 || echo '0')"
echo "Total build size: $(du -sh build | cut -f1)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📝 Next steps:"
echo "1. Review bundle analysis for large dependencies"
echo "2. Consider code splitting for routes"
echo "3. Lazy load images and components"
echo "4. Test with: npm start"
echo "5. Deploy and test with Google PageSpeed Insights"
