import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';
import { Button } from './ui';

const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navSections = [
        {
            title: 'Overview',
            items: [
                { path: '/dashboard', label: 'Dashboard', icon: '📊', exact: true }
            ]
        },
        {
            title: 'Blog Management',
            items: [
                { path: '/dashboard/blogs', label: 'All Blogs', icon: '📝' },
                { path: '/dashboard/blogs/new', label: 'Create Blog', icon: '✍️' }
            ]
        },
        {
            title: 'Game Management',
            items: [
                { path: '/dashboard/games', label: 'All Games', icon: '🎮', exact: true },
                { path: '/dashboard/games/new', label: 'Add Game', icon: '🕹️' }
            ]
        },
        {
            title: 'Engagement',
            items: [
                { path: '/dashboard/comments', label: 'Comments', icon: '💬' },
                { path: '/dashboard/leads', label: 'Leads', icon: '👥' }
            ]
        }
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        // For non-exact matches, check if path starts with the item path
        // but exclude child routes for parent items
        if (path === '/dashboard/games' && location.pathname.includes('/dashboard/games/')) {
            return false;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-game-dark via-game-darker to-black">
            {/* Top Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-game-darker/95 backdrop-blur-sm border-b border-game-purple/20">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white hover:text-game-purple transition-colors lg:hidden"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">JG.</span>
                            <span className="text-game-purple font-semibold">Admin</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                                View Site
                            </Button>
                        </Link>
                        <Button variant="secondary" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar - Always visible on desktop, toggleable on mobile */}
                <aside
                    className={`fixed left-0 top-16 bottom-0 w-64 bg-game-darker/50 border-r border-game-purple/20 transition-transform duration-300 z-40 overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0`}
                >
                    <nav className="p-4 pb-32">
                        {navSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-6">
                                <div className="px-4 mb-2">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path, item.exact)
                                                ? 'bg-game-purple text-white shadow-lg shadow-game-purple/20'
                                                : 'text-gray-400 hover:bg-game-purple/20 hover:text-white'
                                                }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-game-purple/20">
                        <div className="flex items-center gap-3 px-4 py-3 bg-game-dark/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-game-purple flex items-center justify-center text-white font-bold">
                                JG
                            </div>
                            <div>
                                <div className="text-white text-sm font-medium">Jainish Gupta</div>
                                <div className="text-gray-500 text-xs">Administrator</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content - Always has left margin on desktop */}
                <main className="flex-1 lg:ml-64 w-full">
                    <div className="p-6 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
