# 🚀 Jainish Portfolio - Full-Stack Blog System

A complete, production-ready full-stack blog and portfolio system with admin dashboard, comment moderation, and analytics.

## ✨ Features

- 🔐 **Secure Admin Authentication** - JWT-based login system
- 📝 **Blog Management** - Create, edit, delete blogs with markdown support
- 💬 **Comment System** - Two-role system with admin moderation
- 🖼️ **Image Upload** - Cloudinary integration with auto-optimization
- 📊 **Analytics Dashboard** - Real-time stats and insights
- 🎨 **Modern UI** - Gaming-themed design with Tailwind CSS
- 🔒 **Security** - bcrypt, rate limiting, CORS, Helmet.js
- 📱 **Responsive** - Works on all devices

## 🎯 Two-Role System

### Admin
- Full dashboard access
- Create, edit, delete blogs
- Upload images
- Approve/reject comments
- View analytics

### Viewers (Public)
- Read published blogs
- Submit comments (requires approval)
- No registration needed

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MongoDB (local or Atlas)
- Cloudinary account (free tier)

### Installation

```bash
# 1. Install dependencies
npm run install:all

# 2. Configure environment
cd backend
cp .env.example .env
# Edit .env with your settings

# 3. Create admin user
npm run server:seed

# 4. Start development
cd ..
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Admin Login: http://localhost:3000/login

## 📁 Project Structure

```
├── backend/                 # Node.js + Express API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & validation
│   └── server.js           # Express app
├── src/                    # React frontend
│   ├── services/           # API integration
│   ├── components/         # React components
│   └── pages/              # Page components
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🔧 Configuration

### Backend Environment (.env)
```env
MONGODB_URI=mongodb://localhost:27017/jainish-portfolio
JWT_SECRET=your-secret-key-min-32-chars
ADMIN_EMAIL=admin@jainish.space
ADMIN_PASSWORD=your-secure-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Public
- `GET /api/blogs` - List published blogs
- `GET /api/blogs/:slug` - Get single blog
- `GET /api/comments/:slug` - Get blog comments
- `POST /api/comments` - Submit comment

### Admin (Protected)
- `POST /api/auth/login` - Admin login
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/analytics/dashboard` - Get stats
- `PUT /api/comments/:id/approve` - Approve comment
- `POST /api/upload/image` - Upload image

## 🎨 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (images)
- bcrypt (passwords)

### Frontend
- React 18
- React Router v7
- Tailwind CSS
- Custom UI components

## 📚 Documentation

- **[COMPLETE_IMPLEMENTATION_SUMMARY.md](COMPLETE_IMPLEMENTATION_SUMMARY.md)** - Full feature overview
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands & tips
- **[BACKEND_SETUP_GUIDE.md](BACKEND_SETUP_GUIDE.md)** - Detailed backend guide
- **[GET_STARTED.md](GET_STARTED.md)** - Step-by-step setup
- **[backend/API_EXAMPLES.md](backend/API_EXAMPLES.md)** - API testing examples

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jainish.space","password":"your-password"}'

# Get blogs
curl http://localhost:5000/api/blogs
```

## 🚀 Deployment

### Backend
1. Deploy to Railway/Render/Heroku
2. Set environment variables
3. Use MongoDB Atlas
4. Note production API URL

### Frontend
1. Update `REACT_APP_API_URL` to production
2. Run `npm run build`
3. Deploy to Vercel/Netlify

## 📊 Database Schema

### Users
- Email, password (hashed), name, role
- Last login tracking

### Blogs
- Title, slug, excerpt, content
- Category, tags, cover image
- Published status, featured flag
- View count, read time

### Comments
- Blog slug, author (name + email)
- Content, status (pending/approved/rejected)
- Timestamps, approval tracking

### Analytics
- Event type, resource ID
- Timestamp, metadata

## 🔒 Security Features

- JWT token authentication
- Password hashing (bcrypt)
- Rate limiting (100 req/15min)
- CORS protection
- Security headers (Helmet)
- Input validation
- Protected routes

## 🎯 Workflow

1. **Admin Login** → Dashboard
2. **Create Blog** → Add content, images, tags
3. **Publish** → Blog appears on site
4. **Users Comment** → Awaits moderation
5. **Admin Approves** → Comment visible
6. **View Analytics** → Track performance

## 🛠️ Development Commands

```bash
npm run dev              # Start both frontend & backend
npm start                # Frontend only
npm run server           # Backend only
npm run install:all      # Install all dependencies
npm run server:seed      # Create admin user
npm run build            # Build for production
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
mongod  # Start local MongoDB
# Or use MongoDB Atlas connection string
```

### Port Already in Use
```bash
lsof -ti:5000 | xargs kill -9
```

### CORS Error
- Check `FRONTEND_URL` in backend/.env
- Should match your frontend URL

## 📝 License

MIT License - feel free to use for your own projects!

## 👤 Author

**Jainish Gupta**
- Portfolio: [jainish.space](https://jainish.space)
- LinkedIn: [jainish-gupta](https://www.linkedin.com/in/jainish-gupta/)
- GitHub: [AurtherRod](https://github.com/AurtherRod)

---

**Built with ❤️ for developers who want a complete blog system out of the box!**

🎉 **Everything is ready to use - just run `npm run dev` and start blogging!**
