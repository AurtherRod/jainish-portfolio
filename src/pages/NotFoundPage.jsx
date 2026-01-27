import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="Page Not Found - 404 | Jainish Gupta"
        description="The page you're looking for doesn't exist. Return to the home page."
        canonical="https://jainish.space/404"
      />
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Error Code */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[150px] font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          {/* Helpful Description */}
          <p className="text-base md:text-lg text-slate-500 mb-12 max-w-md mx-auto">
            Don't worry! You can return to the home page or explore other sections of my portfolio.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
            <Link
              to="/blog"
              className="px-8 py-3 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-300"
            >
              Explore Blog
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-300"
            >
              View Projects
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="space-y-4 text-slate-600 mb-12">
            <div className="flex justify-center gap-2 text-4xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎮</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🔍</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>📱</span>
            </div>
          </div>

          {/* Additional Help Text */}
          <p className="text-sm text-slate-500">
            If you think this is a mistake, please feel free to{' '}
            <a
              href="mailto:hello@jainish.space"
              className="text-orange-400 hover:text-orange-300 transition-colors underline"
            >
              contact me
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
