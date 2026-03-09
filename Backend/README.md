# Jainish Portfolio Backend

Backend API for jainish.space portfolio and blog platform.

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` and configure:
- MongoDB connection string
- JWT secret key
- Admin credentials

### 3. Create Admin User
```bash
npm run seed
```

### 4. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/change-password` - Change password (protected)

### Blogs (Public)
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get single blog by slug

### Blogs (Admin - Protected)
- `GET /api/blogs/admin/all` - Get all blogs including drafts
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Analytics (Admin - Protected)
- `GET /api/analytics/dashboard` - Get dashboard stats
- `GET /api/analytics/blog/:slug` - Get blog-specific analytics

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Project Structure

```
backend/
├── models/           # Mongoose models
│   ├── User.js
│   ├── Blog.js
│   └── Analytics.js
├── routes/           # API routes
│   ├── auth.js
│   ├── blogs.js
│   └── analytics.js
├── middleware/       # Custom middleware
│   └── auth.js
├── scripts/          # Utility scripts
│   └── seedAdmin.js
├── server.js         # Entry point
├── package.json
└── .env.example
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet.js security headers
- CORS configuration
- Input validation

## Development

```bash
npm run dev    # Start with nodemon
npm run seed   # Create admin user
```
