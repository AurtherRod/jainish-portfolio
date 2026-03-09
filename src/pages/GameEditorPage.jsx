import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createGame, updateGame, fetchAllGames } from '../services/api';
import { Button } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const GameEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        thumbnail: '',
        gamePath: '',
        category: 'Racing',
        tags: [],
        controls: '',
        published: false,
        featured: false
    });
    const [tagInput, setTagInput] = useState('');

    const categories = ['Racing', 'Puzzle', 'Action', 'Adventure', 'Casual', 'Strategy', 'Other'];

    useEffect(() => {
        if (id) {
            loadGame();
        }
    }, [id]);

    const loadGame = async () => {
        try {
            const result = await fetchAllGames();
            const game = result.data.games.find(g => g._id === id);
            if (game) {
                setFormData({
                    title: game.title,
                    slug: game.slug,
                    description: game.description,
                    thumbnail: game.thumbnail || '',
                    gamePath: game.gamePath,
                    category: game.category,
                    tags: game.tags || [],
                    controls: game.controls || '',
                    published: game.published,
                    featured: game.featured
                });
            }
        } catch (error) {
            alert('Failed to load game: ' + error.message);
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

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title)
        });
    };

    const handleSubmit = async (e, publish = false) => {
        e.preventDefault();
        setLoading(true);

        const gameData = {
            ...formData,
            published: publish
        };

        try {
            if (id) {
                await updateGame(id, gameData);
            } else {
                await createGame(gameData);
            }
            navigate('/dashboard/games', { replace: true });
            window.location.reload();
        } catch (error) {
            alert('Failed to save game: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title={`${id ? 'Edit' : 'Add'} Game - Dashboard`} noindex={true} />

            <DashboardLayout>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            {id ? 'Edit Game' : 'Add New Game'}
                        </h1>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, formData.published)} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-white font-medium mb-2">Game Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                placeholder="Enter game title"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-white font-medium mb-2">Slug *</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                placeholder="game-slug"
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                URL: /games/{formData.slug}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-white font-medium mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                rows="4"
                                placeholder="Describe your game"
                                required
                            />
                        </div>

                        {/* Thumbnail and Game Path */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-medium mb-2">Thumbnail Path/URL *</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="/Images/GameImages/game.png or https://example.com/image.jpg"
                                    required
                                />
                                {formData.thumbnail && (
                                    <img
                                        src={formData.thumbnail}
                                        alt="Thumbnail preview"
                                        className="mt-2 w-full h-32 object-cover rounded-lg"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Game Path *</label>
                                <input
                                    type="text"
                                    value={formData.gamePath}
                                    onChange={(e) => setFormData({ ...formData, gamePath: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="/games/my-game/index.html"
                                    required
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Path to your game's HTML file
                                </div>
                            </div>
                        </div>

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

                        {/* Controls */}
                        <div>
                            <label className="block text-white font-medium mb-2">Controls (Optional)</label>
                            <textarea
                                value={formData.controls}
                                onChange={(e) => setFormData({ ...formData, controls: e.target.value })}
                                className="w-full px-4 py-3 bg-game-darker border border-game-purple/30 rounded-lg text-white focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                rows="3"
                                placeholder="Arrow keys to move, Space to jump..."
                            />
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
                                onClick={() => navigate('/dashboard/games')}
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

export default GameEditorPage;
