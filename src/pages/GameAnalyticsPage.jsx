import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGames } from '../services/api';
import { Card, Button } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

const GameAnalyticsPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('all'); // all, today, yesterday, last7days, lastMonth, yearToDate

    useEffect(() => {
        loadGames();
    }, [dateFilter]); // Reload when date filter changes

    // Refresh when window regains focus
    useEffect(() => {
        const handleFocus = () => loadGames();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const loadGames = async () => {
        try {
            const result = await fetchAllGames();
            setGames(result.data.games);
        } catch (error) {
            console.error('Failed to load games:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter games by date
    const getFilteredGames = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const yearStart = new Date(now.getFullYear(), 0, 1);

        return games.filter(game => {
            const gameDate = new Date(game.createdAt);

            switch (dateFilter) {
                case 'today':
                    return gameDate >= today;
                case 'yesterday':
                    return gameDate >= yesterday && gameDate < today;
                case 'last7days':
                    return gameDate >= last7Days;
                case 'lastMonth':
                    return gameDate >= lastMonth;
                case 'yearToDate':
                    return gameDate >= yearStart;
                default:
                    return true;
            }
        });
    };

    const filteredGames = getFilteredGames();

    // Calculate statistics
    const calculateStats = () => {
        const totalGames = filteredGames.length;
        const publishedGames = filteredGames.filter(g => g.published).length;
        const featuredGames = filteredGames.filter(g => g.featured).length;
        const totalPlays = filteredGames.reduce((sum, g) => sum + g.plays, 0);
        const totalRatings = filteredGames.reduce((sum, g) => sum + g.rating.count, 0);
        const avgRating = totalRatings > 0
            ? filteredGames.reduce((sum, g) => sum + (g.rating.average * g.rating.count), 0) / totalRatings
            : 0;

        return {
            totalGames,
            publishedGames,
            featuredGames,
            totalPlays,
            totalRatings,
            avgRating
        };
    };

    const stats = calculateStats();

    // Prepare chart data
    const prepareChartData = () => {
        // 1. Game Status Distribution (Pie Chart)
        const statusData = [
            { name: 'Published', value: stats.publishedGames, color: '#8b5cf6' },
            { name: 'Drafts', value: stats.totalGames - stats.publishedGames, color: '#ec4899' }
        ];

        // 2. Top Games by Plays (Bar Chart)
        const topGamesData = [...filteredGames]
            .sort((a, b) => b.plays - a.plays)
            .slice(0, 5)
            .map(game => ({
                name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                plays: game.plays,
                rating: game.rating.average
            }));

        // 3. Category Distribution (Pie Chart)
        const categoryCount = {};
        filteredGames.forEach(game => {
            categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
        });
        const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
            name,
            value
        }));

        // 4. Games by Rating (Bar Chart)
        const ratingData = [...filteredGames]
            .filter(g => g.rating.count > 0)
            .sort((a, b) => b.rating.average - a.rating.average)
            .slice(0, 5)
            .map(game => ({
                name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                rating: game.rating.average,
                count: game.rating.count
            }));

        // 5. Plays vs Rating Scatter
        const playsVsRatingData = filteredGames
            .filter(g => g.rating.count > 0)
            .map(game => ({
                name: game.title,
                plays: game.plays,
                rating: game.rating.average
            }));

        // 6. Recent Activity Timeline
        const activityData = [...filteredGames]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 7)
            .reverse()
            .map(game => ({
                date: new Date(game.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                plays: game.plays,
                ratings: game.rating.count
            }));

        return { statusData, topGamesData, categoryData, ratingData, playsVsRatingData, activityData };
    };

    const chartData = filteredGames.length > 0 ? prepareChartData() : null;

    // Custom colors
    const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-cream border border-ink/50 p-3 rounded-lg shadow-lg">
                    <p className="text-ink font-semibold">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const dateFilterOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7days', label: 'Last 7 Days' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'yearToDate', label: 'Year to Date' }
    ];

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
            <SEO title="Game Analytics - Dashboard" noindex={true} />

            <DashboardLayout>
                <div className="max-w-7xl mx-auto">
                    {/* Header with Date Filter */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-ink mb-2">
                                Game <span className="text-meadow-deep">Analytics</span>
                            </h1>
                            <p className="text-ink/60">Track game performance and user engagement</p>
                        </div>

                        {/* Date Filter */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            {/* Refresh Button */}
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    loadGames();
                                }}
                                disabled={loading}
                                className="px-4 py-2 rounded-lg font-medium bg-cream text-ink/60 hover:bg-game-purple/20 hover:text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <span className={loading ? 'animate-spin' : ''}>🔄</span>
                                Refresh
                            </button>

                            {/* Date Filters */}
                            <div className="flex gap-2 flex-wrap">
                                {dateFilterOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setDateFilter(option.value)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${dateFilter === option.value
                                            ? 'bg-game-purple text-ink'
                                            : 'bg-cream text-ink/60 hover:bg-game-purple/20 hover:text-ink'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-gradient-to-br from-meadow/15 to-meadow/5 border-ink/15">
                            <div className="p-6">
                                <div className="text-ink/60 text-sm mb-2">Total Games</div>
                                <div className="text-4xl font-bold text-ink mb-1">{stats.totalGames}</div>
                                <div className="text-sm text-ink/50">
                                    {stats.publishedGames} published, {stats.featuredGames} featured
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-coral/15 to-coral/5 border-game-pink/30">
                            <div className="p-6">
                                <div className="text-ink/60 text-sm mb-2">Total Plays</div>
                                <div className="text-4xl font-bold text-ink mb-1">
                                    {stats.totalPlays.toLocaleString()}
                                </div>
                                <div className="text-sm text-ink/50">
                                    {stats.totalGames > 0 ? Math.round(stats.totalPlays / stats.totalGames) : 0} avg per game
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-sun/20 to-sun/5 border-sun/30">
                            <div className="p-6">
                                <div className="text-ink/60 text-sm mb-2">Average Rating</div>
                                <div className="text-4xl font-bold text-ink mb-1">
                                    {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
                                    {stats.avgRating > 0 && <span className="text-2xl ml-1">⭐</span>}
                                </div>
                                <div className="text-sm text-ink/50">
                                    {stats.totalRatings} total ratings
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-gradient-to-br from-teal/20 to-teal/5 border-teal/30">
                            <div className="p-6">
                                <div className="text-ink/60 text-sm mb-2">Published</div>
                                <div className="text-4xl font-bold text-ink mb-1">{stats.publishedGames}</div>
                                <div className="text-sm text-ink/50">
                                    {stats.totalGames > 0 ? Math.round((stats.publishedGames / stats.totalGames) * 100) : 0}% of total
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Charts Section */}
                    {chartData && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Chart 1: Game Status Distribution */}
                            <Card className="bg-cream border-ink/15">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-ink mb-4">📊 Game Status</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={chartData.statusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {chartData.statusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Chart 2: Top Games by Plays */}
                            <Card className="bg-cream border-ink/15">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-ink mb-4">🎮 Most Played Games</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData.topGamesData}>
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
                                            <Bar dataKey="plays" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Chart 3: Category Distribution */}
                            <Card className="bg-cream border-ink/15">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-ink mb-4">📂 Categories</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={chartData.categoryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {chartData.categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Chart 4: Top Rated Games */}
                            {chartData.ratingData.length > 0 && (
                                <Card className="bg-cream border-ink/15">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-ink mb-4">⭐ Top Rated Games</h2>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={chartData.ratingData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                <XAxis
                                                    dataKey="name"
                                                    stroke="#9ca3af"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={100}
                                                    fontSize={12}
                                                />
                                                <YAxis stroke="#9ca3af" domain={[0, 5]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar dataKey="rating" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            )}

                            {/* Chart 5: Activity Timeline */}
                            {chartData.activityData.length > 0 && (
                                <Card className="bg-cream border-ink/15 lg:col-span-2">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-ink mb-4">📈 Activity Timeline</h2>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart data={chartData.activityData}>
                                                <defs>
                                                    <linearGradient id="colorPlays" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorRatings" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                <XAxis dataKey="date" stroke="#9ca3af" />
                                                <YAxis stroke="#9ca3af" />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Legend />
                                                <Area
                                                    type="monotone"
                                                    dataKey="plays"
                                                    stroke="#8b5cf6"
                                                    fillOpacity={1}
                                                    fill="url(#colorPlays)"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="ratings"
                                                    stroke="#ec4899"
                                                    fillOpacity={1}
                                                    fill="url(#colorRatings)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Game List */}
                    <Card className="bg-cream border-ink/15">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-ink mb-4">All Games</h2>
                            {filteredGames.length === 0 ? (
                                <p className="text-ink/60 text-center py-8">No games found for this time period</p>
                            ) : (
                                <div className="space-y-3">
                                    {filteredGames.map((game, index) => (
                                        <div key={game._id} className="flex items-center justify-between p-4 bg-paper rounded-lg">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="text-2xl font-bold text-meadow-deep">#{index + 1}</div>
                                                <img
                                                    src={game.thumbnail}
                                                    alt={game.title}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <div className="flex-1">
                                                    <Link to={`/games/${game.slug}`} className="text-ink hover:text-meadow-deep transition-colors font-semibold">
                                                        {game.title}
                                                    </Link>
                                                    <div className="text-sm text-ink/50 mt-1">
                                                        {game.plays.toLocaleString()} plays •
                                                        {game.rating.count > 0 ? (
                                                            <span> ⭐ {game.rating.average.toFixed(1)} ({game.rating.count} ratings)</span>
                                                        ) : (
                                                            <span> No ratings yet</span>
                                                        )}
                                                        {game.published ? (
                                                            <span className="ml-2 text-teal">• Published</span>
                                                        ) : (
                                                            <span className="ml-2 text-ink/50">• Draft</span>
                                                        )}
                                                        {game.featured && <span className="ml-2 text-sun">• Featured</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={`/dashboard/games/edit/${game._id}`}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    );
};

export default GameAnalyticsPage;
