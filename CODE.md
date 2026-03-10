# Code Documentation

## Project Overview

Full-stack portfolio system with blog management, game management, and comment system.

**Tech Stack:**
- Frontend: React, Tailwind CSS, React Router
- Backend: Node.js, Express, MongoDB
- Authentication: JWT
- Database: MongoDB

---

## Project Structure

```
jainish-portfolio/
├── src/                          # Frontend React app
│   ├── components/               # React components
│   │   ├── ui/                   # UI components (Button, Card, Badge)
│   │   ├── DashboardLayout.jsx   # Dashboard sidebar navigation
│   │   ├── CommentSection.jsx    # Comments with ratings
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogArticle.jsx
│   │   ├── GamePlayerPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js                # API service with all endpoints
│   ├── utils/
│   │   ├── validators.js         # Validation functions
│   │   ├── formatters.js         # Formatting functions
│   │   └── ...
│   ├── hooks/                    # Custom React hooks
│   ├── config/                   # Configuration files
│   ├── data/                     # Static data
│   └── styles/                   # Global styles
│
├── Backend/                      # Node.js/Express backend
│   ├── models/                   # MongoDB models
│   │   ├── User.js               # User model with auth
│   │   ├── Blog.js               # Blog model
│   │   ├── Game.js               # Game model
│   │   ├── Comment.js            # Comment model
│   │   └── Analytics.js          # Analytics model
│   ├── routes/                   # API routes
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── blogs.js              # Blog CRUD endpoints
│   │   ├── games.js              # Game CRUD endpoints
│   │   ├── comments.js           # Comment endpoints
│   │   └── analytics.js          # Analytics endpoints
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── scripts/                  # Database scripts
│   │   ├── seedAdmin.js          # Seed admin user
│   │   ├── migrateBlogsToDb.js   # Migrate blogs to DB
│   │   └── migrateGamesToDb.js   # Migrate games to DB
│   ├── server.js                 # Express server setup
│   └── package.json
│
├── public/                       # Static files
│   ├── Images/                   # Image assets
│   └── index.html
│
└── package.json
```

---

## Frontend API Service

**File**: `src/services/api.js`

### Authentication
```javascript
login(email, password)              // Login user
getCurrentUser()                    // Get current user
changePassword(currentPassword, newPassword)  // Change password
isAuthenticated()                   // Check if authenticated
logout()                            // Logout user
```

### Blogs
```javascript
fetchBlogs(params)                  // Get all public blogs
fetchBlogBySlug(slug)               // Get single blog
fetchAllBlogs()                     // Get all blogs (admin)
createBlog(blogData)                // Create blog
updateBlog(id, blogData)            // Update blog
deleteBlog(id)                      // Delete blog
```

### Games
```javascript
fetchGames(params)                  // Get all public games
fetchGameBySlug(slug)               // Get single game
fetchAllGames()                     // Get all games (admin)
createGame(gameData)                // Create game
updateGame(id, gameData)            // Update game
deleteGame(id)                      // Delete game
```

### Comments
```javascript
fetchComments(slug, type)           // Get comments for blog/game
submitComment(commentData)          // Submit new comment
fetchPendingComments()              // Get pending comments (admin)
fetchAllComments(params)            // Get all comments (admin)
approveComment(id)                  // Approve comment
rejectComment(id)                   // Reject comment
deleteComment(id)                   // Delete comment
```

### Analytics
```javascript
getDashboardAnalytics()             // Get dashboard stats
getBlogAnalytics(slug)              // Get blog analytics
```

---

## Backend API Endpoints

### Authentication
```
POST   /api/auth/login              # Login
GET    /api/auth/me                 # Get current user
POST   /api/auth/change-password    # Change password
```

### Blogs
```
GET    /api/blogs                   # Get all blogs
GET    /api/blogs/:id               # Get single blog
POST   /api/blogs                   # Create blog (auth required)
PUT    /api/blogs/:id               # Update blog (auth required)
DELETE /api/blogs/:id               # Delete blog (auth required)
```

### Games
```
GET    /api/games                   # Get all games
GET    /api/games/:id               # Get single game
POST   /api/games                   # Create game (auth required)
PUT    /api/games/:id               # Update game (auth required)
DELETE /api/games/:id               # Delete game (auth required)
```

### Comments
```
GET    /api/comments/:slug          # Get comments for blog/game
POST   /api/comments                # Submit comment
GET    /api/comments/admin/pending  # Get pending comments (auth)
GET    /api/comments/admin/all      # Get all comments (auth)
PUT    /api/comments/:id/approve    # Approve comment (auth)
PUT    /api/comments/:id/reject     # Reject comment (auth)
DELETE /api/comments/:id            # Delete comment (auth)
```

### Analytics
```
GET    /api/analytics/dashboard     # Get dashboard analytics
GET    /api/analytics/blog/:slug    # Get blog analytics
```

---

## Database Models

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (admin/viewer),
  lastLogin: Date,
  createdAt: Date
}
```

### Blog Model
```javascript
{
  title: String,
  excerpt: String,
  content: String,
  category: String,
  tags: [String],
  thumbnail: String,
  author: ObjectId (User),
  views: Number,
  featured: Boolean,
  publishedAt: Date,
  updatedAt: Date
}
```

### Game Model
```javascript
{
  title: String,
  description: String,
  category: String,
  gamePath: String,
  thumbnail: String,
  author: ObjectId (User),
  playCount: Number,
  averageRating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  author: String,
  email: String,
  content: String,
  status: String (pending/approved/rejected),
  rating: Number (1-5, for games),
  blogId: ObjectId (Blog),
  gameId: ObjectId (Game),
  createdAt: Date
}
```

---

## Frontend Components

### DashboardLayout
Sidebar navigation with sections:
- Overview (Dashboard)
- Blog Management (All Blogs, Create Blog)
- Game Management (All Games, Add Game)
- Engagement (Comments)

### CommentSection
Displays comments with:
- Author name and email
- Comment content
- Status badge (pending/approved)
- Star rating (for games)
- Approve/Delete buttons (admin)

### Pages
- **HomePage**: Portfolio homepage
- **BlogPage**: List all blogs
- **BlogArticle**: Single blog with comments
- **GamePlayerPage**: Play game in iframe
- **DashboardPage**: Admin dashboard with stats and charts
- **LoginPage**: User login

---

## Utilities

### Validators (`src/utils/validators.js`)
```javascript
isValidEmail(email)                 // Validate email format
isValidUrl(url)                     // Validate URL format
isEmpty(value)                      // Check if value is empty
```

### Formatters (`src/utils/formatters.js`)
```javascript
formatDate(date, locale)            // Format date to readable string
formatNumber(num)                   // Format number with commas
truncateText(text, maxLength)       // Truncate text with ellipsis
slugify(text)                       // Convert text to slug
```

---

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5001/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## Setup & Installation

### Frontend
```bash
npm install
npm start
```

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Database
```bash
# Start MongoDB
mongod

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
```

---

## Key Features

✅ **Authentication**: JWT-based user authentication
✅ **Blog Management**: Create, read, update, delete blogs
✅ **Game Management**: Add games with iframe support
✅ **Comments**: Comment system with approval workflow
✅ **Ratings**: Rate games 1-5 stars
✅ **Dashboard**: Admin dashboard with analytics
✅ **Cache Busting**: Automatic cache invalidation
✅ **Responsive**: Mobile-friendly design
✅ **Security**: Password hashing, rate limiting, CORS

---

## Common Tasks

### Add New Blog
1. Go to Dashboard → Create Blog
2. Fill in title, excerpt, content, category, tags
3. Click Save
4. Blog appears in Blog List

### Add New Game
1. Go to Dashboard → Add Game
2. Fill in title, description, category, game path
3. Click Save
4. Game appears in Games List

### Approve Comments
1. Go to Dashboard → Comments
2. View pending comments
3. Click Approve/Reject
4. Comment status updates

### View Analytics
1. Go to Dashboard
2. See blog and game statistics
3. View charts and recent activity

---

## Error Handling

### Frontend
- API errors caught and displayed to user
- Network errors show retry option
- Form validation before submission
- Error boundaries for component crashes

### Backend
- Input validation on all endpoints
- JWT verification on protected routes
- MongoDB error handling
- Rate limiting on API endpoints

---

## Performance

- Cache-busting timestamps on admin API calls
- Lazy loading of images
- Optimized database queries
- Gzip compression enabled
- CDN-ready static files

---

## Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication
- CORS configured
- Helmet.js for security headers
- Rate limiting on API
- Input validation and sanitization

---

## Deployment

### Frontend
```bash
npm run build
# Deploy build/ folder to hosting
```

### Backend
```bash
npm start
# Deploy to server with Node.js
```

---

## Support

For issues or questions, check:
1. Console for error messages
2. Network tab for API calls
3. Database logs for MongoDB errors
4. Backend logs for server errors
