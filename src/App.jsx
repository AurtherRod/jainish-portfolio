import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import './styles/globals.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const GamePlayerPage = lazy(() => import('./pages/GamePlayerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => (
  <Router>
    <div className="antialiased relative">
      <ParticleBackground />
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <Header />
      <main id="main-content" role="main" className="relative z-10">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-game-pink opacity-20"></div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/projects" element={<GamesPage />} />
            <Route path="/games/:gameId" element={<GamePlayerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;