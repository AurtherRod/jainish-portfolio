// IMPORTANT: Make sure .env file exists in root with REACT_APP_API_URL
// If .env is not loaded, it will use the fallback URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Debug: Log the API URL being used
console.log('API URL:', API_URL);
console.log('Environment:', process.env.REACT_APP_API_URL);

// Helper function to get auth headers with cache control
const getAuthHeaders = (noCache = false) => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(noCache && {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        })
    };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }
    return data;
};

// ============ AUTH API ============
export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const changePassword = async (currentPassword, newPassword) => {
    const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
    });
    return handleResponse(response);
};

// ============ BLOGS API ============
export const fetchBlogs = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/blogs${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    return handleResponse(response);
};

export const fetchBlogBySlug = async (slug) => {
    const response = await fetch(`${API_URL}/blogs/${slug}`, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    return handleResponse(response);
};

export const fetchAllBlogs = async () => {
    const timestamp = new Date().getTime(); // Cache buster
    const response = await fetch(`${API_URL}/blogs/admin/all?_t=${timestamp}`, {
        headers: getAuthHeaders(true) // Enable no-cache
    });
    return handleResponse(response);
};

export const createBlog = async (blogData) => {
    const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData)
    });
    return handleResponse(response);
};

export const updateBlog = async (id, blogData) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData)
    });
    return handleResponse(response);
};

export const deleteBlog = async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ============ ANALYTICS API ============
export const getDashboardAnalytics = async () => {
    const timestamp = new Date().getTime(); // Cache buster
    const response = await fetch(`${API_URL}/analytics/dashboard?_t=${timestamp}`, {
        headers: getAuthHeaders(true)
    });
    return handleResponse(response);
};

export const getBlogAnalytics = async (slug) => {
    const response = await fetch(`${API_URL}/analytics/blog/${slug}`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ============ COMMENTS API ============
export const fetchComments = async (slug, type = 'blog') => {
    const response = await fetch(`${API_URL}/comments/${slug}?type=${type}`);
    return handleResponse(response);
};

export const submitComment = async (commentData) => {
    const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    });
    return handleResponse(response);
};

export const fetchPendingComments = async () => {
    const timestamp = new Date().getTime(); // Cache buster
    const response = await fetch(`${API_URL}/comments/admin/pending?_t=${timestamp}`, {
        headers: getAuthHeaders(true)
    });
    return handleResponse(response);
};

export const fetchAllComments = async (params = {}) => {
    const timestamp = new Date().getTime(); // Cache buster
    params._t = timestamp; // Add cache buster to params
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/comments/admin/all${queryString ? `?${queryString}` : ''}`, {
        headers: getAuthHeaders(true)
    });
    return handleResponse(response);
};

export const approveComment = async (id) => {
    const response = await fetch(`${API_URL}/comments/${id}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const rejectComment = async (id) => {
    const response = await fetch(`${API_URL}/comments/${id}/reject`, {
        method: 'PUT',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const deleteComment = async (id) => {
    const response = await fetch(`${API_URL}/comments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ============ UPLOAD API ============
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData
    });
    return handleResponse(response);
};

export const deleteImage = async (publicId) => {
    const response = await fetch(`${API_URL}/upload/image/${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ============ GAMES API ============
export const fetchGames = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/games${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    return handleResponse(response);
};

export const fetchGameBySlug = async (slug) => {
    const response = await fetch(`${API_URL}/games/${slug}`, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    return handleResponse(response);
};

export const fetchAllGames = async () => {
    const timestamp = new Date().getTime(); // Cache buster
    const response = await fetch(`${API_URL}/games/admin/all?_t=${timestamp}`, {
        headers: getAuthHeaders(true)
    });
    return handleResponse(response);
};

export const createGame = async (gameData) => {
    const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(gameData)
    });
    return handleResponse(response);
};

export const updateGame = async (id, gameData) => {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(gameData)
    });
    return handleResponse(response);
};

export const deleteGame = async (id) => {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ============ AUTH HELPERS ============
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
