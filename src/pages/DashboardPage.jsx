import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardAnalytics } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

const DashboardPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    // Refresh analytics when window regains focus
    useEffect(() => {
        const handleFocus = () => {
            fetchAnalytics();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const result = await getDashboardAnalytics();
            setAnalytics(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Custom colors for charts
    const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    // Custom tooltip style
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-cream border border-ink/50 p-3 rounded-lg shadow-lg">
                    <p className="text-ink font-semibold">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-ink border-t-transparent"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <SEO
                title="Dashboard - Jainish Portfolio"
                description="Admin dashboard"
                noindex={true}
            />

            <DashboardLayout>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-ink mb-2">
                                Admin <span className="text-meadow-deep">Dashboard</span>
                            </h1>
                            <p className="text-ink/60">Overview of your portfolio content</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => fetchAnalytics()}
                            disabled={loading}
                        >
                            {loading ? '↻ Refreshing...' : '↻ Refresh'}
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-coral/15 border border-coral rounded-lg p-4 text-coral mb-6">
                            {error}
                        </div>
                    )}

                    {analytics && (
                        <>
                            {/* Blog Stats Grid */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-ink mb-4">📝 Blog Statistics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Card className="bg-gradient-to-br from-meadow/15 to-meadow/5 border-ink/15">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Total Blogs</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.blogs.overview.totalBlogs}
                                            </div>
                                            <div className="text-sm text-ink/50">
                                                {analytics.blogs.overview.publishedBlogs} published
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-coral/15 to-coral/5 border-game-pink/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Total Views</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.blogs.overview.totalViews.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-ink/50">
                                                {analytics.blogs.overview.recentViews} recent
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-sky/20 to-sky/5 border-sky/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Published</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.blogs.overview.publishedBlogs}
                                            </div>
                                            <div className="text-sm text-ink/50">Live articles</div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-teal/20 to-teal/5 border-teal/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Drafts</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.blogs.overview.draftBlogs}
                                            </div>
                                            <div className="text-sm text-ink/50">Unpublished</div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Game Stats Grid */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-ink mb-4">🎮 Game Statistics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Card className="bg-gradient-to-br from-sky/20 to-sky/5 border-sky/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Total Games</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.games.overview.totalGames}
                                            </div>
                                            <div className="text-sm text-ink/50">
                                                {analytics.games.overview.featuredGames} featured
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-coral/20 to-coral/5 border-coral/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Total Plays</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.games.overview.totalPlays.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-ink/50">
                                                {analytics.games.overview.totalGames > 0
                                                    ? Math.round(analytics.games.overview.totalPlays / analytics.games.overview.totalGames)
                                                    : 0} avg/game
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-sun/20 to-sun/5 border-sun/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Avg Rating</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.games.overview.avgRating > 0
                                                    ? analytics.games.overview.avgRating.toFixed(1)
                                                    : 'N/A'}
                                                {analytics.games.overview.avgRating > 0 && <span className="text-2xl ml-1">⭐</span>}
                                            </div>
                                            <div className="text-sm text-ink/50">
                                                {analytics.games.overview.totalRatings} ratings
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-teal/20 to-teal/5 border-teal/30">
                                        <div className="p-6">
                                            <div className="text-ink/60 text-sm mb-2">Published</div>
                                            <div className="text-2xl md:text-4xl font-bold text-ink mb-1">
                                                {analytics.games.overview.publishedGames}
                                            </div>
                                            <div className="text-sm text-ink/50">Live games</div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Top Blogs by Views */}
                                {analytics.blogs.mostViewedBlogs.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-ink mb-4">📝 Top Blogs by Views</h2>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={analytics.blogs.mostViewedBlogs.map(blog => ({
                                                    name: blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title,
                                                    views: blog.views
                                                }))}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#9ca3af"
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={100}
                                                        fontSize={12}
                                                    />
                                                    <YAxis stroke="#9ca3af" />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar dataKey="views" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>
                                )}

                                {/* Most Played Games */}
                                {analytics.games.mostPlayedGames.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-ink mb-4">🎮 Most Played Games</h2>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={analytics.games.mostPlayedGames.map(game => ({
                                                    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                                                    plays: game.plays
                                                }))}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#9ca3af"
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={100}
                                                        fontSize={12}
                                                    />
                                                    <YAxis stroke="#9ca3af" />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar dataKey="plays" fill="#ec4899" radius={[8, 8, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>
                                )}

                                {/* Blog Categories */}
                                {analytics.blogs.viewsByCategory.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-ink mb-4">📂 Blog Categories</h2>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie
                                                        data={analytics.blogs.viewsByCategory.map(cat => ({
                                                            name: cat._id,
                                                            value: cat.count
                                                        }))}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {analytics.blogs.viewsByCategory.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>
                                )}

                                {/* Game Categories */}
                                {analytics.games.gamesByCategory.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-ink mb-4">🎯 Game Categories</h2>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie
                                                        data={analytics.games.gamesByCategory.map(cat => ({
                                                            name: cat._id,
                                                            value: cat.count
                                                        }))}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {analytics.games.gamesByCategory.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>
                                )}
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Recent Blogs */}
                                <Card className="bg-cream border-ink/15">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-ink mb-4">📝 Recent Blogs</h2>
                                        <div className="space-y-3">
                                            {analytics.blogs.recentBlogs.map((blog) => (
                                                <div key={blog._id} className="flex items-center justify-between p-4 bg-paper rounded-lg">
                                                    <div className="flex-1">
                                                        <Link to={`/blog/${blog.slug}`} className="text-ink hover:text-meadow-deep transition-colors line-clamp-1">
                                                            {blog.title}
                                                        </Link>
                                                        <div className="text-sm text-ink/50 mt-1">
                                                            {new Date(blog.createdAt).toLocaleDateString()} •
                                                            {blog.published ? (
                                                                <Badge variant="success" className="ml-2">Published</Badge>
                                                            ) : (
                                                                <Badge variant="tech" className="ml-2">Draft</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link to={`/dashboard/blogs/edit/${blog._id}`}>
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                {/* Recent Comments */}
                                {analytics.comments && analytics.comments.recentComments.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                                                <h2 className="text-2xl font-bold text-ink">💬 Recent Comments</h2>
                                                {analytics.comments.overview.pendingComments > 0 && (
                                                    <Badge variant="tech">{analytics.comments.overview.pendingComments} Pending</Badge>
                                                )}
                                            </div>
                                            <div className="space-y-3">
                                                {analytics.comments.recentComments.map((comment) => (
                                                    <div key={comment._id} className="p-4 bg-paper rounded-lg">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex-1">
                                                                <div className="text-ink font-semibold">{comment.author.name}</div>
                                                                <div className="text-xs text-ink/50">
                                                                    {comment.contentType === 'game' ? '🎮' : '📝'} {comment.contentSlug}
                                                                    {comment.rating && <span className="ml-2">⭐ {comment.rating}</span>}
                                                                </div>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    comment.status === 'approved' ? 'success' :
                                                                        comment.status === 'pending' ? 'tech' :
                                                                            'default'
                                                                }
                                                                className="text-xs"
                                                            >
                                                                {comment.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-ink/75 text-sm line-clamp-2">{comment.content}</p>
                                                        <div className="text-xs text-ink/50 mt-2">
                                                            {new Date(comment.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link to="/dashboard/comments" className="block mt-4">
                                                <Button variant="outline" className="w-full">View All Comments</Button>
                                            </Link>
                                        </div>
                                    </Card>
                                )}

                                {/* Top Rated Games */}
                                {analytics.games.topRatedGames.length > 0 && (
                                    <Card className="bg-cream border-ink/15">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-ink mb-4">⭐ Top Rated Games</h2>
                                            <div className="space-y-3">
                                                {analytics.games.topRatedGames.map((game, index) => (
                                                    <div key={game._id} className="flex items-center justify-between p-4 bg-paper rounded-lg">
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <div className="text-2xl font-bold text-meadow-deep">#{index + 1}</div>
                                                            <div className="flex-1">
                                                                <Link to={`/games/${game.slug}`} className="text-ink hover:text-meadow-deep transition-colors line-clamp-1">
                                                                    {game.title}
                                                                </Link>
                                                                <div className="text-sm text-ink/50 mt-1">
                                                                    ⭐ {game.rating.average.toFixed(1)} ({game.rating.count}) • {game.plays} plays
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link to={`/dashboard/games/edit/${game._id}`}>
                                                            <Button variant="outline" size="sm">Edit</Button>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default DashboardPage;
