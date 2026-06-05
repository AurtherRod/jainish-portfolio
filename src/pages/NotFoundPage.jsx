import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Jainish Gupta"
        description="The page you're looking for doesn't exist."
      />

      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="slab max-w-2xl w-full text-center p-10 md:p-14 bg-sky/15">
          <span className="toon-pill bg-coral text-white mb-5"><span>👾</span> Game Over</span>
          <h1 className="font-display text-8xl md:text-9xl text-meadow-deep mt-4 mb-2 leading-none toon-outline" style={{ WebkitTextStrokeColor: 'var(--ink)' }}>
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">
            🎮 Level Not Found
          </h2>
          <p className="text-ink/70 text-lg mb-2 font-semibold">
            Looks like this page doesn't exist in the scene hierarchy.
          </p>
          <p className="text-ink/55 font-semibold mb-8">
            Let's respawn you back to safety!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="toon-btn">
              🏠 Back to Home
            </Link>
            <Link to="/projects" className="toon-btn toon-btn--sun">
              🎮 View My Games
            </Link>
          </div>

          <p className="mt-8 text-ink/45 text-sm font-mono">
            Debug.Log("Crafted by a Software Engineer");
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
