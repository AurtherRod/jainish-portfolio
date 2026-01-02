import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';

const gamesData = {
  'car-race': {
    title: 'Car Race',
    description: 'An exciting racing game where you compete against time and obstacles. Built with Unity and optimized for WebGL performance.',
    path: '/Games/CarRace/CarRace/index.html',
    color: 'from-red-600 to-orange-600',
    tags: ['Racing', 'Action', '3D'],
    tech: ['Unity', 'C#', 'WebGL'],
    aspectRatio: 'landscape' // 16:9 or wider
  },
  'memory-game': {
    title: 'Memory Game',
    description: 'Test your memory skills by matching pairs of cards in this classic game. Features smooth animations and responsive design.',
    path: '/Games/MemoryGame/MemoryGame/index.html',
    color: 'from-green-600 to-teal-600',
    tags: ['Puzzle', 'Casual', '2D'],
    tech: ['Unity', 'C#', 'WebGL'],
    aspectRatio: 'landscape'
  },
  'space-shooter': {
    title: 'Space Shooter',
    description: 'Defend the galaxy by shooting down enemy spaceships in this action-packed shooter. Fast-paced gameplay with challenging enemies.',
    path: '/Games/SpaceShooter/SpaceShooter/index.html',
    color: 'from-blue-600 to-purple-600',
    tags: ['Shooter', 'Action', '2D'],
    tech: ['Unity', 'C#', 'WebGL'],
    aspectRatio: 'portrait' // vertical game
  }
};

const GamePlayerPage = () => {
  const { gameId } = useParams();
  const game = gamesData[gameId];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleIframeLoad = () => {
      setTimeout(() => setIsLoading(false), 1000);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
          <Link to="/games" className="text-blue-400 hover:text-blue-300">← Back to Games</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${game.title} by Jainish Gupta`}
        description={game.description}
        keywords={['Unity game', 'WebGL game', game.title, 'Jainish Gupta']}
      />

      <div className="min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 py-6">
          <Link to="/games" className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all by Jainish Gupta
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Main Game Area - 2/3 width */}
            <div className="lg:col-span-2">
              {/* Game Player */}
              <div
                ref={containerRef}
                className="relative bg-black rounded overflow-hidden mb-3 mx-auto"
                style={isFullscreen ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, borderRadius: 0 } :
                  game.aspectRatio === 'portrait' ? { maxWidth: '500px' } : {}}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20">
                    <div className="relative w-24 h-24 mb-4">
                      <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white text-lg font-semibold mb-2">Loading {game.title}...</p>
                    <p className="text-gray-400 text-sm">Please wait while the game loads</p>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={game.path}
                  title={game.title}
                  className="w-full"
                  style={isFullscreen ? { width: '100%', height: '100%', display: 'block' } :
                    game.aspectRatio === 'portrait' ? { height: '700px', display: 'block' } : { height: '550px', display: 'block' }}
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded transition-all mb-6 neon-shadow"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>

              {/* Game Description */}
              <div className="card-hover rounded p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{game.title}</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{game.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {game.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 dark:bg-gray-700/50 text-blue-700 dark:text-gray-300 px-3 py-1 rounded text-sm border border-blue-300 dark:border-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Made with Unity</span>
                    <span>HTML5 • WebGL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1">
              {/* Author Card */}
              <div className="card-hover rounded p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    JG
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Created by</div>
                    <div className="text-gray-900 dark:text-white font-semibold">Jainish Gupta</div>
                  </div>
                </div>
                <Link
                  to="/"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-center py-2 rounded transition-all font-semibold neon-shadow"
                >
                  View Portfolio
                </Link>
              </div>

              {/* Game Info */}
              <div className="card-hover rounded p-6 mb-4">
                <h3 className="text-gray-900 dark:text-white font-bold mb-4 text-lg">Game Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Status</div>
                    <div className="text-gray-900 dark:text-white font-medium">Released</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Platform</div>
                    <div className="text-gray-900 dark:text-white font-medium">HTML5 (WebGL)</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Genre</div>
                    <div className="text-gray-900 dark:text-white font-medium">{game.tags[0]}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Made with</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.tech.map((tech, index) => (
                        <span key={index} className="bg-blue-100 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Tags</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* More Games */}
              <div className="card-hover rounded p-6">
                <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-lg">More Games</h3>
                <Link
                  to="/games"
                  className="block w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-2 rounded transition-all font-semibold"
                >
                  Browse All Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePlayerPage;
