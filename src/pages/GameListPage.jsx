import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGames, deleteGame } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const GameListPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadGames();
    }, [filter]); // Reload when filter changes

    useEffect(() => {
        const handleFocus = () => {
            loadGames();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const loadGames = async () => {
        setLoading(true);
        try {
            const result = await fetchAllGames();
            setGames(result.data.games);
        } catch (error) {
            console.error('Failed to load games:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            await deleteGame(id);
            setGames(games.filter(game => game._id !== id));
            await loadGames();
        } catch (error) {
            alert('Failed to delete game: ' + error.message);
        }
    };

    const filteredGames = games.filter(game => {
        if (filter === 'published') return game.published;
        if (filter === 'draft') return !game.published;
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
            <SEO title="Manage Games - Dashboard" noindex={true} />

            <DashboardLayout>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">Manage Games</h1>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => loadGames()}
                                disabled={loading}
                            >
                                {loading ? '↻ Refreshing...' : '↻ Refresh'}
                            </Button>
                            <Link to="/dashboard/games/new">
                                <Button variant="primary">+ Add New Game</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-6">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All ({games.length})
                        </Button>
                        <Button
                            variant={filter === 'published' ? 'primary' : 'outline'}
                            onClick={() => setFilter('published')}
                        >
                            Published ({games.filter(g => g.published).length})
                        </Button>
                        <Button
                            variant={filter === 'draft' ? 'primary' : 'outline'}
                            onClick={() => setFilter('draft')}
                        >
                            Drafts ({games.filter(g => !g.published).length})
                        </Button>
                    </div>

                    {/* Game List */}
                    {filteredGames.length === 0 ? (
                        <Card className="bg-game-darker/50 border-game-purple/30 p-12 text-center">
                            <p className="text-gray-400 text-lg">No games found</p>
                            <Link to="/dashboard/games/new" className="mt-4 inline-block">
                                <Button variant="primary">Add Your First Game</Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGames.map(game => (
                                <Card key={game._id} className="bg-game-darker/50 border-game-purple/30 hover:border-game-purple/50 transition-all">
                                    <div className="relative">
                                        <img
                                            src={game.thumbnail}
                                            alt={game.title}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                            onError={(e) => {
                                                e.target.src = '/Images/hyper-casual.png';
                                            }}
                                        />
                                        {game.featured && (
                                            <Badge variant="achievement" className="absolute top-2 right-2">
                                                ⭐ Featured
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="text-xl font-bold text-white">{game.title}</h3>
                                            {game.published ? (
                                                <Badge variant="success">Published</Badge>
                                            ) : (
                                                <Badge variant="tech">Draft</Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-3 line-clamp-2">{game.description}</p>
                                        <div className="flex gap-4 text-sm text-gray-500 mb-3">
                                            <span className="text-game-purple">{game.category}</span>
                                            <span>•</span>
                                            <span>{game.plays} plays</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {game.published && (
                                                <Link to={`/games/${game.slug}`} target="_blank">
                                                    <Button variant="outline" size="sm">Play</Button>
                                                </Link>
                                            )}
                                            <Link to={`/dashboard/games/edit/${game._id}`}>
                                                <Button variant="primary" size="sm">Edit</Button>
                                            </Link>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleDelete(game._id, game.title)}
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

export default GameListPage;
