# Backend Quick Start

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` - minimum required:
```env
MONGODB_URI=mongodb://localhost:27017/jainish-portfolio
JWT_SECRET=your-secret-key-min-32-characters
ADMIN_EMAIL=admin@jainish.space
ADMIN_PASSWORD=your-password
```

### 3. Create Admin User
```bash
npm run seed
```

### 4. Start Server
```bash
npm run dev
```

✅ Backend running on `http://localhost:5000`

---

## 📡 Test Your API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jainish.space","password":"your-password"}'
```

Save the token from response!

### Create Blog (use your token)
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "excerpt": "Short description",
    "content": "Full content here",
    "category": "Game Development",
    "published": true
  }'
```

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

---

## 🎯 API Endpoints Cheat Sheet

### Public
- `GET /api/blogs` - All published blogs
- `GET /api/blogs/:slug` - Single blog

### Protected (need JWT token)
- `POST /api/auth/login` - Get token
- `GET /api/auth/me` - Current user
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/analytics/dashboard` - Dashboard stats

---

## 🔧 Common Commands

```bash
npm run dev      # Development with auto-reload
npm start        # Production mode
npm run seed     # Create admin user
```

---

## 🐛 Quick Fixes

**MongoDB not connecting?**
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas cloud (free)
```

**Port 5000 in use?**
```bash
lsof -ti:5000 | xargs kill -9
```

**Forgot admin password?**
- Edit `.env` ADMIN_PASSWORD
- Run `npm run seed` again

---

## 📚 Full Documentation

See `BACKEND_SETUP_GUIDE.md` for complete details.
