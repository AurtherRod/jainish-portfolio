import * as api from '../../services/api';

describe('API Service', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        localStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Authentication', () => {
        it('should login user', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: { token: 'test-token', user: { id: '1' } } }),
            });

            const result = await api.login('user@example.com', 'password');
            expect(result).toHaveProperty('data');
            expect(global.fetch).toHaveBeenCalled();
        });

        it('should get current user', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: { user: { id: '1', email: 'user@example.com' } } }),
            });

            const result = await api.getCurrentUser();
            expect(result).toHaveProperty('data');
        });

        it('should handle login error', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ message: 'Invalid credentials' }),
            });

            await expect(api.login('user@example.com', 'wrong')).rejects.toThrow();
        });
    });

    describe('Blog Operations', () => {
        it('should fetch all blogs', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: '1', title: 'Blog 1' }],
            });

            const result = await api.fetchBlogs();
            expect(Array.isArray(result)).toBe(true);
            expect(global.fetch).toHaveBeenCalled();
        });

        it('should fetch single blog by slug', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'Blog 1' }),
            });

            const result = await api.fetchBlogBySlug('blog-1');
            expect(result).toHaveProperty('title');
        });

        it('should create a blog', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'New Blog' }),
            });

            const result = await api.createBlog({
                title: 'New Blog',
                content: 'Content',
            });

            expect(result).toHaveProperty('id');
            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                })
            );
        });

        it('should update a blog', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'Updated Blog' }),
            });

            const result = await api.updateBlog('1', { title: 'Updated Blog' });
            expect(result.title).toBe('Updated Blog');
        });

        it('should delete a blog', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Deleted' }),
            });

            await api.deleteBlog('1');
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('Game Operations', () => {
        it('should fetch all games', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: '1', title: 'Game 1' }],
            });

            const result = await api.fetchGames();
            expect(Array.isArray(result)).toBe(true);
        });

        it('should fetch single game by slug', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'Game 1' }),
            });

            const result = await api.fetchGameBySlug('game-1');
            expect(result).toHaveProperty('title');
        });

        it('should create a game', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'New Game' }),
            });

            const result = await api.createGame({
                title: 'New Game',
                gamePath: 'https://example.com/game',
            });

            expect(result).toHaveProperty('id');
        });

        it('should update a game', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', title: 'Updated Game' }),
            });

            const result = await api.updateGame('1', { title: 'Updated Game' });
            expect(result.title).toBe('Updated Game');
        });

        it('should delete a game', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Deleted' }),
            });

            await api.deleteGame('1');
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('Comment Operations', () => {
        it('should fetch comments', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: '1', content: 'Comment 1' }],
            });

            const result = await api.fetchComments('blog-1');
            expect(Array.isArray(result)).toBe(true);
        });

        it('should submit a comment', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', content: 'New comment' }),
            });

            const result = await api.submitComment({
                author: 'User',
                email: 'user@example.com',
                content: 'New comment',
                blogId: '1',
            });

            expect(result).toHaveProperty('id');
        });

        it('should approve a comment', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: '1', status: 'approved' }),
            });

            const result = await api.approveComment('1');
            expect(result.status).toBe('approved');
        });

        it('should delete a comment', async () => {
            localStorage.setItem('token', 'test-token');
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Deleted' }),
            });

            await api.deleteComment('1');
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        it('should handle network errors', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            await expect(api.fetchBlogs()).rejects.toThrow('Network error');
        });

        it('should handle API errors', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ message: 'Server error' }),
            });

            await expect(api.fetchBlogs()).rejects.toThrow();
        });
    });

    describe('Authentication helpers', () => {
        it('should check if authenticated', () => {
            expect(api.isAuthenticated()).toBe(false);
            localStorage.setItem('token', 'test-token');
            expect(api.isAuthenticated()).toBe(true);
        });
    });
});
