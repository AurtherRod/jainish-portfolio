import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import GamesPage from './pages/GamesPage';
import GamePlayerPage from './pages/GamePlayerPage';
import Footer from './components/Footer';
import './styles/globals.css';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/projects" element={<GamesPage />} />
            <Route path="/games/:gameId" element={<GamePlayerPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;