import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

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
        if (exact) return location.pathname === path;
        if (path === '/dashboard/games' && location.pathname.includes('/dashboard/games/')) return false;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen overflow-x-hidden" style={{ background: '#fdf6ee' }}>
            {/* Top Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b-[3px] border-ink shadow-[0_3px_0_0_var(--ink)]">
                <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-ink hover:text-meadow-deep transition-colors lg:hidden"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <span className="font-display text-2xl text-ink">JG.</span>
                            <span className="toon-pill bg-meadow text-white text-[0.65rem]">Admin</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/" target="_blank" rel="noopener noreferrer" className="toon-btn toon-btn--ghost text-xs py-1 px-2.5 hidden sm:inline-flex">
                            View Site ↗
                        </Link>
                        <button onClick={handleLogout} className="toon-btn toon-btn--coral text-xs py-1 px-2.5">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex pt-14">
                {/* Sidebar */}
                <aside
                    className={`fixed left-0 top-14 bottom-0 w-60 bg-cream border-r-[3px] border-ink transition-transform duration-300 z-40 overflow-y-auto ${
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                >
                    <nav className="p-4 pb-28">
                        {navSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-5">
                                <div className="px-3 mb-2">
                                    <h3 className="text-[0.65rem] font-bold text-ink/45 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                                                isActive(item.path, item.exact)
                                                    ? 'bg-meadow text-white border-[2px] border-ink shadow-[2px_2px_0_0_var(--ink)]'
                                                    : 'text-ink/70 hover:bg-sun/20 hover:text-ink border-[2px] border-transparent'
                                            }`}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 border-t-[2px] border-ink/15">
                        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-sun/15 rounded-xl">
                            <div className="w-9 h-9 rounded-full bg-meadow border-[2px] border-ink flex items-center justify-center text-white font-bold text-sm shadow-[2px_2px_0_0_var(--ink)]">
                                JG
                            </div>
                            <div>
                                <div className="text-ink text-sm font-bold">Jainish Gupta</div>
                                <div className="text-ink/50 text-xs font-semibold">Administrator</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-60 w-full">
                    <div className="p-5 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-ink/30 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
