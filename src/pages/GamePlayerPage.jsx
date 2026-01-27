import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { projectsData } from '../data/projects';

const GamePlayerPage = () => {
  const { gameId } = useParams();
  const game = projectsData.find(p => p.id === gameId && p.isPlayable);
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
          <Link to="/games" className="text-cyan-400 hover:text-cyan-300">← Back to Games</Link>
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
          <Link to="/projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors text-sm">
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-20">
                    <div className="relative w-24 h-24 mb-4">
                      <div className="absolute inset-0 border-4 border-cyan-900 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white text-lg font-semibold mb-2">Loading {game.title}...</p>
                    <p className="text-gray-400 text-sm">Please wait while the game loads</p>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={game.gamePath}
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
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded transition-all mb-6 neon-shadow"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>

              {/* Game Description */}
              <div className="card-hover rounded p-6">
                <h1 className="text-3xl font-bold text-white mb-4">{game.title}</h1>
                <p className="text-gray-400 mb-4 leading-relaxed">{game.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {game.tags && game.tags.map((tag, index) => (
                    <span key={index} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded text-sm border border-cyan-500/40">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-cyan-500/30 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-400">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    JG
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Created by</div>
                    <div className="text-white font-semibold">Jainish Gupta</div>
                  </div>
                </div>
                <Link
                  to="/"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-center py-2 rounded transition-all font-semibold neon-shadow"
                >
                  View Portfolio
                </Link>
              </div>

              {/* Game Info */}
              <div className="card-hover rounded p-6 mb-4">
                <h3 className="text-white font-bold mb-4 text-lg">Game Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Status</div>
                    <div className="text-white font-medium">Released</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Platform</div>
                    <div className="text-white font-medium">HTML5 (WebGL)</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Genre</div>
                    <div className="text-white font-medium">{game.tags && game.tags[0]}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Made with</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.technologies && game.technologies.map((tech, index) => (
                        <span key={index} className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2 py-1 rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Tags</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.tags && game.tags.map((tag, index) => (
                        <span key={index} className="bg-slate-700/50 text-gray-300 px-2 py-1 rounded text-xs border border-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* More Games */}
              <div className="card-hover rounded p-6">
                <h3 className="text-white font-bold mb-3 text-lg">More Projects</h3>
                <Link
                  to="/projects"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-white text-center py-2 rounded transition-all font-semibold"
                >
                  Browse All Projects
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
