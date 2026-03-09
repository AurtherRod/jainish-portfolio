import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBlog, updateBlog, fetchAllBlogs } from '../services/api';
import { Button } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const BlogEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Game Development',
        tags: [],
        coverImage: '',
        published: false,
        featured: false
    });
    const [tagInput, setTagInput] = useState('');

    const categories = [
        'Game Development',
        'Web Development',
        'Tutorial',
        'Career',
        'Technology',
        'Backend',
        'Architecture',
        'Other'
    ];

    useEffect(() => {
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadBlog = async () => {
        try {
            const result = await fetchAllBlogs();
            const blog = result.data.blogs.find(b => b._id === id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    excerpt: blog.excerpt,
                    content: blog.content,
                    category: blog.category,
                    tags: blog.tags || [],
                    coverImage: blog.coverImage || '',
                    published: blog.published,
                    featured: blog.featured
                });
            }
        } catch (error) {
            alert('Failed to load blog: ' + error.message);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleSubmit = async (e, publish = false) => {
        e.preventDefault();
        setLoading(true);

        const blogData = {
            ...formData,
            published: publish
        };

        try {
            if (id) {
                await updateBlog(id, blogData);
            } else {
                await createBlog(blogData);
            }
            // Navigate back and force refresh
            navigate('/dashboard/blogs', { replace: true });
            // Force a page reload to clear any cached data
            window.location.reload();
        } catch (error) {
            alert('Failed to save blog: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title={`${id ? 'Edit' : 'Create'} Blog - Dashboard`} noindex={true} />

            <DashboardLayout>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            {id ? 'Edit Blog' : 'Create New Blog'}
                        </h1>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, formData.published)} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-white font-medium mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-white font-medium mb-2">Excerpt *</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                rows="3"
                                placeholder="Short description (max 300 characters)"
                                maxLength="300"
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/300</div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-white font-medium mb-2">Content * (Markdown supported)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all font-mono text-sm"
                                rows="20"
                                placeholder="Write your blog content here... (supports markdown)"
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Supports: **bold**, *italic*, # headings, - lists, ```code blocks```
                            </div>
                        </div>

                        {/* Category and Cover Image Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-white font-medium mb-2">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Cover Image URL */}
                            <div>
                                <label className="block text-white font-medium mb-2">Cover Image URL</label>
                                <input
                                    type="url"
                                    value={formData.coverImage}
                                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Upload your image to a hosting service and paste the URL here
                                </div>
                                {formData.coverImage && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.coverImage}
                                            alt="Cover preview"
                                            className="w-full h-32 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-white font-medium mb-2">Tags</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                    className="flex-1 px-4 py-2 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="Add a tag and press Enter"
                                />
                                <Button type="button" variant="outline" onClick={handleAddTag}>
                                    Add Tag
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-game-purple/20 text-game-purple px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-game-pink"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 rounded border-game-purple/30 bg-game-darker text-game-purple focus:ring-game-purple"
                                />
                                <span className="text-white">Published</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 rounded border-game-purple/30 bg-game-darker text-game-purple focus:ring-game-purple"
                                />
                                <span className="text-white">Featured</span>
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-game-purple/20">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (formData.published ? 'Update & Publish' : 'Save Draft')}
                            </Button>
                            {!formData.published && (
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={(e) => handleSubmit(e, true)}
                                    disabled={loading}
                                >
                                    Save & Publish
                                </Button>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/dashboard/blogs')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

export default BlogEditorPage;
