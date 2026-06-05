import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/globals.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const GamePlayerPage = lazy(() => import('./pages/GamePlayerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogEditorPage = lazy(() => import('./pages/BlogEditorPage'));
const GameListPage = lazy(() => import('./pages/GameListPage'));
const GameEditorPage = lazy(() => import('./pages/GameEditorPage'));
const CommentModerationPage = lazy(() => import('./pages/CommentModerationPage'));
const LeadsPage = lazy(() => import('./pages/LeadsPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-meadow border-t-transparent"></div>
      <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-sun opacity-20"></div>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  return (
    <div className="antialiased relative">
      {!isDashboard && <ParticleBackground />}
      {!isDashboard && <ScrollProgress />}
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      {!isDashboard && <Header />}
      <main id="main-content" role="main" className="relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/projects" element={<GamesPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/:slug" element={<GamePlayerPage />} />

              {/* Admin Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><DashboardPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/blogs" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><BlogListPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/blogs/new" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><BlogEditorPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/blogs/edit/:id" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><BlogEditorPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/games" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><GameListPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/games/new" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><GameEditorPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/games/edit/:id" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><GameEditorPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/comments" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><CommentModerationPage /></ProtectedRoute></Suspense>} />
              <Route path="/dashboard/leads" element={<Suspense fallback={<LoadingFallback />}><ProtectedRoute><LeadsPage /></ProtectedRoute></Suspense>} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isDashboard && <Footer />}
      </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <Router>
      <AppContent />
    </Router>
  </ErrorBoundary>
);

export default App;