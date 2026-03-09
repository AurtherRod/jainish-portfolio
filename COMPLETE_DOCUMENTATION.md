# Jainish Portfolio - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup & Installation](#setup--installation)
4. [Features](#features)
5. [Backend API](#backend-api)
6. [Frontend Structure](#frontend-structure)
7. [Dashboard Guide](#dashboard-guide)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

A full-stack portfolio website with blog and game management system built with React, Node.js, Express, and MongoDB.

### Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Recharts (for analytics)
- Fetch API

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

**Key Features:**
- Blog management with CRUD operations
- Game management with play tracking and ratings
- Comment system with moderation
- Analytics dashboard with charts
- User authentication
- Responsive design

---

## Architecture

### Backend Structure
```
Backend/
├── models/
│   ├── User.js          # Admin user model
│   ├── Blog.js          # Blog posts
│   ├── Game.js          # Games with ratings
│   ├── Comment.js       # Comments for blogs/games
│   └── Analytics.js     # Analytics tracking
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── blogs.js         # Blog CRUD
│   ├── games.js         # Game CRUD
│   ├── comments.js      # Comment moderation
│   └── analytics.js     # Dashboard statistics
├── middleware/
│   └── auth.js          # JWT protection
├── scripts/
│   ├── seedAdmin.js     # Create admin user
│   ├── migrateBlogsToDb.js   # Import blogs
│   └── migrateGamesToDb.js   # Import games
└── server.js            # Express app
```

### Frontend Structure
```
src/
├── components/
│   ├── DashboardLayout.jsx    # Admin layout
│   ├── CommentSection.jsx     # Comments with ratings
│   ├── SEO.jsx                # Meta tags
│   └── ui/                    # Reusable components
├── pages/
│   ├── HomePage.jsx           # Landing page
│   ├── BlogPage.jsx           # Blog list
│   ├── BlogArticle.jsx        # Single blog
│   ├── GamesPage.jsx          # Games list
│   ├── GamePlayerPage.jsx     # Game player
│   ├── DashboardPage.jsx      # Admin dashboard
│   ├── BlogListPage.jsx       # Manage blogs
│   ├── BlogEditorPage.jsx     # Create/edit blog
│   ├── GameListPage.jsx       # Manage games
│   ├── GameEditorPage.jsx     # Create/edit game
│   ├── CommentModerationPage.jsx  # Moderate comments
│   └── LoginPage.jsx          # Admin login
├── services/
│   └── api.js                 # API calls
└── App.jsx                    # Routes
```

---

## Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to Backend folder:**
```bash
cd Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. **Create admin user:**
```bash
node scripts/seedAdmin.js
```
Default credentials: `admin@example.com` / `admin123`

5. **Start backend:**
```bash
npm run dev
```
Backend runs on http://localhost:5001

### Frontend Setup

1. **Navigate to root folder:**
```bash
cd ..
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5001/api
```

4. **Start frontend:**
```bash
npm start
```
Frontend runs on http://localhost:3000

### Database Migration

**Import existing blogs:**
```bash
cd Backend
node scripts/migrateBlogsToDb.js add
```

**Import existing games:**
```bash
node scripts/migrateGamesToDb.js add
```

---

## Features

### 1. Blog Management

**Public Features:**
- View all published blogs
- Read individual blog posts
- Comment on blogs
- SEO optimized pages

**Admin Features:**
- Create/edit/delete blogs
- Rich text editor
- Publish/unpublish
- Category and tags
- Featured images
- View analytics

**Blog Model:**
```javascript
{
  title: String,
  slug: String (unique),
  content: String,
  excerpt: String,
  category: String,
  tags: [String],
  featuredImage: String,
  published: Boolean,
  featured: Boolean,
  views: Number,
  createdAt: Date,
  publishedAt: Date
}
```

### 2. Game Management

**Public Features:**
- Browse published games
- Play games in iframe
- Rate games (1-5 stars)
- Comment on games
- View play count and ratings

**Admin Features:**
- Upload games
- Set game details
- Publish/unpublish
- Feature games
- Track plays and ratings
- Manage game comments

**Game Model:**
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  thumbnail: String,
  gamePath: String,
  category: String,
  tags: [String],
  controls: String,
  published: Boolean,
  featured: Boolean,
  plays: Number,
  rating: {
    average: Number,
    count: Number
  },
  createdAt: Date
}
```

### 3. Comment System

**Features:**
- Comments on blogs and games
- Rating system for games (1-5 stars)
- Admin moderation required
- Approve/reject/delete comments
- Author name and email
- Timestamps

**Comment Model:**
```javascript
{
  contentSlug: String,
  contentType: String (blog/game),
  author: {
    name: String,
    email: String
  },
  content: String,
  rating: Number (1-5, games only),
  status: String (pending/approved/rejected),
  createdAt: Date
}
```

### 4. Analytics Dashboard

**Blog Statistics:**
- Total blogs count
- Published vs drafts
- Total views
- Most viewed blogs
- Category distribution
- Recent blogs

**Game Statistics:**
- Total games count
- Published vs drafts
- Total plays
- Average rating
- Most played games
- Top rated games
- Category distribution

**Comment Statistics:**
- Total comments
- Pending comments
- Approved comments
- Recent comments

**Charts:**
- Bar charts for top content
- Pie charts for categories
- Interactive tooltips
- Responsive design

---

## Backend API

### Base URL
```
http://localhost:5001/api
```

### Authentication

**Login:**
```
POST /auth/login
Body: { email, password }
Response: { token, user }
```

**Get Current User:**
```
GET /auth/me
Headers: Authorization: Bearer <token>
Response: { user }
```

### Blogs

**Get Published Blogs:**
```
GET /blogs
Query: ?category=tech&featured=true
Response: { blogs }
```

**Get Blog by Slug:**
```
GET /blogs/:slug
Response: { blog }
```

**Get All Blogs (Admin):**
```
GET /blogs/admin/all
Headers: Authorization: Bearer <token>
Response: { blogs }
```

**Create Blog (Admin):**
```
POST /blogs
Headers: Authorization: Bearer <token>
Body: { title, content, category, tags, published, ... }
Response: { blog }
```

**Update Blog (Admin):**
```
PUT /blogs/:id
Headers: Authorization: Bearer <token>
Body: { title, content, ... }
Response: { blog }
```

**Delete Blog (Admin):**
```
DELETE /blogs/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### Games

**Get Published Games:**
```
GET /games
Response: { games }
```

**Get Game by Slug:**
```
GET /games/:slug
Response: { game }
```

**Get All Games (Admin):**
```
GET /games/admin/all
Headers: Authorization: Bearer <token>
Response: { games }
```

**Create Game (Admin):**
```
POST /games
Headers: Authorization: Bearer <token>
Body: { title, slug, description, thumbnail, gamePath, category, ... }
Response: { game }
```

**Update Game (Admin):**
```
PUT /games/:id
Headers: Authorization: Bearer <token>
Body: { title, description, ... }
Response: { game }
```

**Delete Game (Admin):**
```
DELETE /games/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### Comments

**Get Comments:**
```
GET /comments/:slug?type=blog
Query: type=blog or type=game
Response: { comments }
```

**Submit Comment:**
```
POST /comments
Body: { contentSlug, contentType, author: { name, email }, content, rating }
Response: { comment }
```

**Get Pending Comments (Admin):**
```
GET /comments/admin/pending
Headers: Authorization: Bearer <token>
Response: { comments }
```

**Get All Comments (Admin):**
```
GET /comments/admin/all?status=approved
Headers: Authorization: Bearer <token>
Response: { comments }
```

**Approve Comment (Admin):**
```
PUT /comments/:id/approve
Headers: Authorization: Bearer <token>
Response: { comment }
```

**Reject Comment (Admin):**
```
PUT /comments/:id/reject
Headers: Authorization: Bearer <token>
Response: { comment }
```

**Delete Comment (Admin):**
```
DELETE /comments/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### Analytics

**Get Dashboard Analytics (Admin):**
```
GET /analytics/dashboard
Headers: Authorization: Bearer <token>
Response: {
  blogs: { overview, mostViewedBlogs, recentBlogs, viewsByCategory },
  games: { overview, mostPlayedGames, topRatedGames, gamesByCategory },
  comments: { overview, recentComments }
}
```

---

## Frontend Structure

### Routing

**Public Routes:**
- `/` - Home page
- `/blog` - Blog list
- `/blog/:slug` - Single blog
- `/projects` - Games list (also shows other projects)
- `/games/:slug` - Game player

**Admin Routes (Protected):**
- `/login` - Admin login
- `/dashboard` - Analytics dashboard
- `/dashboard/blogs` - Manage blogs
- `/dashboard/blogs/new` - Create blog
- `/dashboard/blogs/edit/:id` - Edit blog
- `/dashboard/games` - Manage games
- `/dashboard/games/new` - Add game
- `/dashboard/games/edit/:id` - Edit game
- `/dashboard/comments` - Moderate comments

### API Service

All API calls go through `src/services/api.js` with:
- Automatic JWT token handling
- Cache-busting timestamps
- No-cache headers
- Error handling
- Response parsing

**Example:**
```javascript
import { fetchBlogs, createBlog } from '../services/api';

// Get blogs
const result = await fetchBlogs({ category: 'tech' });
const blogs = result.data.blogs;

// Create blog (requires auth)
const newBlog = await createBlog({
  title: 'My Blog',
  content: 'Content here',
  published: true
});
```

### Cache Busting

All admin API calls include timestamp parameters to prevent browser caching:
```javascript
GET /api/blogs/admin/all?_t=1710123456789
```

This ensures fresh data on every request without manual cache clearing.

---

## Dashboard Guide

### Navigation Structure

**Overview:**
- 📊 Dashboard - Main analytics page

**Blog Management:**
- 📝 All Blogs - View and manage blogs
- ✍️ Create Blog - Write new blog

**Game Management:**
- 🎮 All Games - View and manage games
- 🕹️ Add Game - Upload new game

**Engagement:**
- 💬 Comments - Moderate comments

### Dashboard Features

**Statistics Cards:**
- Blog stats (total, published, views, drafts)
- Game stats (total, plays, rating, published)

**Charts:**
- Top blogs by views (bar chart)
- Most played games (bar chart)
- Blog categories (pie chart)
- Game categories (pie chart)

**Recent Activity:**
- Recent blogs with edit links
- Recent comments with status
- Top rated games with edit links

**Refresh:**
- Manual refresh button
- Auto-refresh on window focus
- Filter-based refresh

### Managing Blogs

**Create Blog:**
1. Click "Create Blog" in sidebar
2. Fill in title (slug auto-generates)
3. Write content
4. Add excerpt, category, tags
5. Upload featured image URL
6. Check "Published" to make live
7. Click "Save & Publish" or "Save Draft"

**Edit Blog:**
1. Go to "All Blogs"
2. Click "Edit" on any blog
3. Make changes
4. Click "Update & Publish"

**Delete Blog:**
1. Go to "All Blogs"
2. Click "Delete" on blog
3. Confirm deletion

**Filters:**
- All - Show all blogs
- Published - Only live blogs
- Drafts - Only unpublished blogs

### Managing Games

**Add Game:**
1. Click "Add Game" in sidebar
2. Enter title (slug auto-generates)
3. Add description
4. Enter thumbnail path/URL (e.g., `/Images/GameImages/game.png`)
5. Enter game path (e.g., `/Games/MyGame/index.html`)
6. Select category
7. Add controls description
8. Add tags
9. Check "Published" and/or "Featured"
10. Click "Save & Publish"

**Edit Game:**
1. Go to "All Games"
2. Click "Edit" on game
3. Make changes
4. Click "Update & Publish"

**Delete Game:**
1. Go to "All Games"
2. Click "Delete" on game
3. Confirm deletion

**Game Requirements:**
- Game must be in `public/Games/` folder
- Thumbnail in `public/Images/GameImages/`
- Game should be HTML5/WebGL
- Will load in iframe on game page

### Moderating Comments

**View Comments:**
1. Go to "Comments" in sidebar
2. Use filters: Pending, Approved, Rejected, All

**Approve Comment:**
1. Find pending comment
2. Click "Approve"
3. Comment appears on blog/game

**Reject Comment:**
1. Find pending comment
2. Click "Reject"
3. Comment hidden from public

**Delete Comment:**
1. Find any comment
2. Click "Delete"
3. Confirm deletion
4. Comment permanently removed

**Comment Details:**
- Author name and email
- Content preview
- Blog/Game indicator
- Rating (for game comments)
- Status badge
- Timestamp

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas cloud database
```

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Solution:** Kill process or change port
```bash
# Find process
lsof -i :5001

# Kill process
kill -9 <PID>

# Or change PORT in .env
```

**JWT Secret Error:**
```
Error: JWT_SECRET is not defined
```
**Solution:** Add JWT_SECRET to `.env` file

### Frontend Issues

**API Connection Error:**
```
Failed to fetch
```
**Solution:**
1. Check backend is running on port 5001
2. Verify REACT_APP_API_URL in `.env`
3. Check CORS settings in backend

**Refresh Not Working:**
- Click manual refresh button (↻)
- Check browser console for errors
- Verify API calls have timestamp parameter
- Clear browser cache (Cmd+Shift+R)

**Images Not Loading:**
- Verify images are in `public/` folder
- Use relative paths: `/Images/file.png`
- Check browser console for 404 errors

**Login Issues:**
- Verify admin user exists (run seedAdmin.js)
- Check credentials
- Clear localStorage and try again
- Check JWT_SECRET matches in backend

### Common Errors

**"Cannot read property of undefined":**
- Check API response structure
- Verify data exists before accessing
- Add optional chaining: `data?.property`

**"Network Error":**
- Backend not running
- Wrong API URL
- CORS issue
- Firewall blocking

**"Unauthorized":**
- Token expired (login again)
- Token missing
- Invalid token
- Check Authorization header

### Cache Issues

**Old data showing after update:**
1. Click refresh button on page
2. Switch tabs and come back (auto-refresh)
3. Hard refresh browser (Cmd+Shift+R)
4. Check timestamp in API URL

**Solution:** All admin endpoints now use cache-busting timestamps automatically.

### Performance Issues

**Slow dashboard loading:**
- Check MongoDB indexes
- Reduce chart data points
- Optimize queries
- Use pagination

**Game not loading:**
- Check game path is correct
- Verify game files exist
- Check browser console
- Test game path directly

---

## Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
```

---

## Security Notes

1. **Change default admin password** after first login
2. **Use strong JWT_SECRET** in production
3. **Enable HTTPS** in production
4. **Set secure CORS** origins
5. **Rate limit** API endpoints
6. **Validate** all user inputs
7. **Sanitize** content before display
8. **Use environment variables** for secrets
9. **Keep dependencies** updated
10. **Regular backups** of MongoDB

---

## Deployment

### Backend Deployment

1. Set production environment variables
2. Use MongoDB Atlas for database
3. Deploy to Heroku/Railway/DigitalOcean
4. Set NODE_ENV=production
5. Enable HTTPS
6. Configure CORS for production domain

### Frontend Deployment

1. Build production bundle: `npm run build`
2. Deploy to Vercel/Netlify/AWS S3
3. Set REACT_APP_API_URL to production backend
4. Configure redirects for React Router
5. Enable HTTPS

---

## Support

For issues or questions:
1. Check this documentation
2. Review error messages
3. Check browser console
4. Check backend logs
5. Verify environment variables
6. Test API endpoints directly

---

## Summary

This is a complete full-stack portfolio system with:
- ✅ Blog management with CRUD operations
- ✅ Game management with play tracking
- ✅ Comment system with ratings
- ✅ Analytics dashboard with charts
- ✅ JWT authentication
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Cache-busting for fresh data
- ✅ Admin moderation
- ✅ Real-time statistics

All features are production-ready and fully functional!
