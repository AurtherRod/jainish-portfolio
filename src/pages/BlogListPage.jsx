import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs, deleteBlog } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const BlogListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadBlogs();
    }, []);

    // Add effect to reload when navigating back to this page
    useEffect(() => {
        const handleFocus = () => {
            loadBlogs();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        try {
            const result = await fetchAllBlogs();
            setBlogs(result.data.blogs);
        } catch (error) {
            console.error('Failed to load blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            await deleteBlog(id);
            // Remove from local state immediately
            setBlogs(blogs.filter(blog => blog._id !== id));
            // Also reload to ensure fresh data
            await loadBlogs();
        } catch (error) {
            alert('Failed to delete blog: ' + error.message);
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        if (filter === 'published') return blog.published;
        if (filter === 'draft') return !blog.published;
        return true;
    });

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <SEO title="Manage Blogs - Dashboard" noindex={true} />

            <DashboardLayout>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">Manage Blogs</h1>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => loadBlogs()}
                                disabled={loading}
                            >
                                {loading ? '↻ Refreshing...' : '↻ Refresh'}
                            </Button>
                            <Link to="/dashboard/blogs/new">
                                <Button variant="primary">+ Create New Blog</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-6">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All ({blogs.length})
                        </Button>
                        <Button
                            variant={filter === 'published' ? 'primary' : 'outline'}
                            onClick={() => setFilter('published')}
                        >
                            Published ({blogs.filter(b => b.published).length})
                        </Button>
                        <Button
                            variant={filter === 'draft' ? 'primary' : 'outline'}
                            onClick={() => setFilter('draft')}
                        >
                            Drafts ({blogs.filter(b => !b.published).length})
                        </Button>
                    </div>

                    {/* Blog List */}
                    {filteredBlogs.length === 0 ? (
                        <Card className="bg-game-darker/50 border-game-purple/30 p-12 text-center">
                            <p className="text-gray-400 text-lg">No blogs found</p>
                            <Link to="/dashboard/blogs/new" className="mt-4 inline-block">
                                <Button variant="primary">Create Your First Blog</Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {filteredBlogs.map(blog => (
                                <Card key={blog._id} className="bg-game-darker/50 border-game-purple/30 hover:border-game-purple/50 transition-all">
                                    <div className="p-6 flex justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                                                {blog.published ? (
                                                    <Badge variant="success">Published</Badge>
                                                ) : (
                                                    <Badge variant="tech">Draft</Badge>
                                                )}
                                                {blog.featured && <Badge variant="achievement">⭐ Featured</Badge>}
                                            </div>
                                            <p className="text-gray-400 mb-3 line-clamp-2">{blog.excerpt}</p>
                                            <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
                                                <span className="text-game-purple">{blog.category}</span>
                                                <span>•</span>
                                                <span>{blog.views} views</span>
                                                <span>•</span>
                                                <span>{blog.readTime} min read</span>
                                                <span>•</span>
                                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex gap-2 mt-3 flex-wrap">
                                                    {blog.tags.slice(0, 5).map((tag, idx) => (
                                                        <span key={idx} className="text-xs bg-game-purple/20 text-game-purple px-2 py-1 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {blog.published && (
                                                <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        View
                                                    </Button>
                                                </a>
                                            )}
                                            <Link to={`/dashboard/blogs/edit/${blog._id}`}>
                                                <Button variant="primary" size="sm" className="w-full">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleDelete(blog._id, blog.title)}
                                                className="w-full"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default BlogListPage;
