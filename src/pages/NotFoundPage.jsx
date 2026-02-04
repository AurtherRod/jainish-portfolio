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

      <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-2xl w-full">
          {/* Header */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-3xl opacity-30">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full"></div>
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full"></div>
            </div>
            <div className="relative">
              <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 animate-gradient">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                🎮 Level Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                Looks like this page doesn't exist in the scene hierarchy.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Let's respawn you back to safety!
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/"
              className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="text-2xl mr-2 group-hover:animate-bounce">🏠</span>
              Back to Home
            </Link>

            <Link
              to="/projects"
              className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="text-2xl mr-2 group-hover:animate-bounce">🎮</span>
              View My Games
            </Link>
          </div>

          <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm font-mono">
            Debug.Log("Crafted with C# by a Game Developer");
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default NotFoundPage;
