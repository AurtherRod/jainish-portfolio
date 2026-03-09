# API Examples & Testing

Complete examples for all API endpoints.

## Setup

1. Start backend: `npm run dev`
2. Base URL: `http://localhost:5000/api`
3. Get JWT token from login endpoint
4. Use token in Authorization header: `Bearer YOUR_TOKEN`

---

## Authentication

### Login
```bash
POST /api/auth/login

# Request
{
  "email": "admin@jainish.space",
  "password": "your-password"
}

# Response
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "admin@jainish.space",
      "name": "Jainish Gupta",
      "role": "admin"
    }
  }
}
```

### Get Current User (Protected)
```bash
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN

# Response
{
  "status": "success",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "admin@jainish.space",
      "name": "Jainish Gupta",
      "role": "admin",
      "lastLogin": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Change Password (Protected)
```bash
POST /api/auth/change-password
Authorization: Bearer YOUR_TOKEN

# Request
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}

# Response
{
  "status": "success",
  "message": "Password changed successfully"
}
```

---

## Blogs - Public Endpoints

### Get All Published Blogs
```bash
GET /api/blogs

# Optional query parameters:
# ?category=Game Development
# ?tag=Unity
# ?featured=true
# ?limit=10
# ?page=1

# Response
{
  "status": "success",
  "data": {
    "blogs": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "title": "Building My First Unity Game",
        "slug": "building-my-first-unity-game",
        "excerpt": "Learn how I built my first game in Unity...",
        "author": "Jainish Gupta",
        "category": "Game Development",
        "tags": ["Unity", "C#", "Tutorial"],
        "coverImage": "/images/unity-game.jpg",
        "readTime": 8,
        "views": 1250,
        "published": true,
        "featured": true,
        "publishedAt": "2024-01-10T00:00:00.000Z",
        "createdAt": "2024-01-09T15:30:00.000Z",
        "updatedAt": "2024-01-10T10:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "pages": 2
    }
  }
}
```

### Get Single Blog by Slug
```bash
GET /api/blogs/building-my-first-unity-game

# Response
{
  "status": "success",
  "data": {
    "blog": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "title": "Building My First Unity Game",
      "slug": "building-my-first-unity-game",
      "excerpt": "Learn how I built my first game in Unity...",
      "content": "Full blog content with markdown...",
      "author": "Jainish Gupta",
      "category": "Game Development",
      "tags": ["Unity", "C#", "Tutorial"],
      "coverImage": "/images/unity-game.jpg",
      "readTime": 8,
      "views": 1251,
      "published": true,
      "featured": true,
      "publishedAt": "2024-01-10T00:00:00.000Z",
      "createdAt": "2024-01-09T15:30:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  }
}
```

---

## Blogs - Admin Endpoints (Protected)

### Get All Blogs (Including Drafts)
```bash
GET /api/blogs/admin/all
Authorization: Bearer YOUR_TOKEN

# Response - same structure as public endpoint but includes unpublished blogs
```

### Create New Blog
```bash
POST /api/blogs
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

# Request
{
  "title": "Advanced Unity Techniques",
  "excerpt": "Dive deep into advanced Unity development patterns",
  "content": "Full blog content here with markdown support...",
  "category": "Game Development",
  "tags": ["Unity", "Advanced", "Patterns"],
  "coverImage": "/images/advanced-unity.jpg",
  "published": true,
  "featured": false
}

# Response
{
  "status": "success",
  "message": "Blog created successfully",
  "data": {
    "blog": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "title": "Advanced Unity Techniques",
      "slug": "advanced-unity-techniques",
      "excerpt": "Dive deep into advanced Unity development patterns",
      "content": "Full blog content here...",
      "author": "Jainish Gupta",
      "category": "Game Development",
      "tags": ["Unity", "Advanced", "Patterns"],
      "coverImage": "/images/advanced-unity.jpg",
      "readTime": 12,
      "views": 0,
      "published": true,
      "featured": false,
      "publishedAt": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Update Blog
```bash
PUT /api/blogs/65f1a2b3c4d5e6f7g8h9i0j2
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

# Request (only include fields to update)
{
  "title": "Advanced Unity Techniques - Updated",
  "featured": true,
  "tags": ["Unity", "Advanced", "Patterns", "Best Practices"]
}

# Response
{
  "status": "success",
  "message": "Blog updated successfully",
  "data": {
    "blog": {
      // Updated blog object
    }
  }
}
```

### Delete Blog
```bash
DELETE /api/blogs/65f1a2b3c4d5e6f7g8h9i0j2
Authorization: Bearer YOUR_TOKEN

# Response
{
  "status": "success",
  "message": "Blog deleted successfully"
}
```

---

## Analytics - Admin Endpoints (Protected)

### Get Dashboard Analytics
```bash
GET /api/analytics/dashboard
Authorization: Bearer YOUR_TOKEN

# Response
{
  "status": "success",
  "data": {
    "overview": {
      "totalBlogs": 15,
      "publishedBlogs": 12,
      "draftBlogs": 3,
      "totalViews": 45230,
      "recentViews": 1250
    },
    "mostViewedBlogs": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "title": "Building My First Unity Game",
        "slug": "building-my-first-unity-game",
        "views": 5420
      }
    ],
    "recentBlogs": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "title": "Advanced Unity Techniques",
        "slug": "advanced-unity-techniques",
        "published": true,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "viewsByCategory": [
      {
        "_id": "Game Development",
        "totalViews": 28500,
        "count": 8
      },
      {
        "_id": "Web Development",
        "totalViews": 16730,
        "count": 4
      }
    ]
  }
}
```

### Get Blog-Specific Analytics
```bash
GET /api/analytics/blog/building-my-first-unity-game
Authorization: Bearer YOUR_TOKEN

# Response
{
  "status": "success",
  "data": {
    "blog": {
      "title": "Building My First Unity Game",
      "slug": "building-my-first-unity-game",
      "totalViews": 5420,
      "published": true,
      "publishedAt": "2024-01-10T00:00:00.000Z"
    },
    "viewHistory": [
      {
        "_id": "2024-01-10",
        "count": 120
      },
      {
        "_id": "2024-01-11",
        "count": 250
      },
      {
        "_id": "2024-01-12",
        "count": 180
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Not authorized to access this route. Please login."
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Blog not found"
}
```

### 500 Server Error
```json
{
  "status": "error",
  "message": "Server error"
}
```

---

## Testing with cURL

### Complete Workflow Example

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jainish.space","password":"your-password"}' \
  | jq -r '.data.token')

echo "Token: $TOKEN"

# 2. Create a blog
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Blog Post",
    "excerpt": "This is a test",
    "content": "Full content here",
    "category": "Tutorial",
    "published": true
  }'

# 3. Get all blogs
curl http://localhost:5000/api/blogs

# 4. Get dashboard analytics
curl http://localhost:5000/api/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

---

## Testing with JavaScript (Frontend)

```javascript
// Login and store token
const login = async () => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@jainish.space',
      password: 'your-password'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.data.token);
  return data.data.token;
};

// Create blog
const createBlog = async (blogData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5000/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(blogData)
  });
  
  return response.json();
};

// Get all blogs
const getBlogs = async () => {
  const response = await fetch('http://localhost:5000/api/blogs');
  return response.json();
};

// Usage
await login();
await createBlog({
  title: 'My Blog',
  excerpt: 'Short description',
  content: 'Full content',
  category: 'Game Development',
  published: true
});
const blogs = await getBlogs();
```

---

## Postman Collection

Import this JSON into Postman for easy testing:

```json
{
  "info": {
    "name": "Jainish Portfolio API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@jainish.space\",\n  \"password\": \"your-password\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

---

**Happy Testing! 🚀**
