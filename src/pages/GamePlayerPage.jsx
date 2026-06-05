import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameBySlug } from '../services/api';
import { projectsData } from '../data/projects';
import SEO from '../components/SEO';
import CommentSection from '../components/CommentSection';

const GamePlayerPage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [started, setStarted] = useState(false);
  const gameContainerRef = useRef(null);

  useEffect(() => { loadGame(); }, [slug]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const loadGame = async () => {
    try {
      const result = await fetchGameBySlug(slug);
      setGame(result.data.game);
    } catch (err) {
      // Fallback: try to find the game in static projectsData
      const staticGame = projectsData.find(p => p.id === slug && p.isPlayable);
      if (staticGame) {
        setGame({
          title: staticGame.title,
          description: staticGame.description,
          gamePath: staticGame.gamePath,
          thumbnail: staticGame.image,
          category: staticGame.tags?.[0] || 'Game',
          tags: staticGame.tags || staticGame.technologies || [],
          controls: staticGame.controls || null,
          plays: 0,
          rating: { count: 0, average: 0 },
          aspectRatio: staticGame.aspectRatio || 'landscape',
        });
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFullscreen = () => {
    const el = gameContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <div className="animate-toonbob text-5xl">🎮</div>
        <p className="font-display text-xl text-ink/70">Loading game...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="slab text-center p-10 max-w-md">
          <div className="text-5xl mb-4">😢</div>
          <h1 className="font-display text-3xl text-ink mb-3">Game Not Found</h1>
          <p className="text-ink/60 mb-6 font-semibold">{error || 'This game doesn\'t seem to exist.'}</p>
          <Link to="/games" className="toon-btn">
            ← Browse Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title={`${game.title} - Play Now | Jainish Portfolio`}
        description={game.description}
        keywords={game.tags}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <Link to="/games" className="inline-flex items-center gap-1.5 text-meadow-deep hover:text-meadow font-semibold mb-5 transition-colors text-sm">
          <span>←</span> All Games
        </Link>

        {/* Game title area */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <h1 className="font-display text-3xl md:text-4xl text-ink">{game.title}</h1>
          <span className="toon-pill bg-sky">{game.category}</span>
        </div>

        {/* Game Frame — friendly, rounded, cozy */}
        <div className="slab overflow-hidden mb-6 p-0 bg-cream">
          <div
            ref={gameContainerRef}
            className="relative w-full bg-[#1e1228]"
            style={{
              aspectRatio: game.aspectRatio === 'portrait' ? '3/4' : '16/9',
              maxHeight: '480px',
            }}
          >
            {!started ? (
              /* Friendly play overlay */
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-b from-[#2d1f3a] to-[#1a1024]">
                {game.thumbnail && (
                  <img
                    src={game.thumbnail}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md"
                  />
                )}
                <div className="relative flex flex-col items-center">
                  <div className="text-6xl mb-5 animate-toonbob">🕹️</div>
                  <button
                    onClick={() => setStarted(true)}
                    className="toon-btn text-xl py-4 px-12"
                  >
                    ▶ Play Now
                  </button>
                  <p className="text-cream/50 text-sm mt-4 font-semibold">
                    Tap to start playing
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                src={game.gamePath}
                title={game.title}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="fullscreen; autoplay"
              />
            )}
          </div>

          {/* Bottom bar — friendly actions */}
          <div className="flex items-center justify-between px-4 py-3 border-t-[3px] border-ink bg-cream">
            <div className="flex items-center gap-4 text-sm text-ink/60 font-semibold">
              <span className="flex items-center gap-1.5">
                <span>👁</span> {game.plays || 0} plays
              </span>
              {game.rating && game.rating.count > 0 && (
                <span className="flex items-center gap-1">
                  ⭐ {game.rating.average.toFixed(1)}
                </span>
              )}
            </div>
            <button
              onClick={toggleFullscreen}
              className="toon-btn toon-btn--sun text-sm py-1.5 px-4 shadow-[0_3px_0_0_var(--ink)]"
            >
              {isFullscreen ? '↙ Exit' : '⛶ Fullscreen'}
            </button>
          </div>
        </div>

        {/* About this game */}
        <div className="slab p-6 md:p-8 mb-6">
          <h2 className="font-display text-2xl text-ink mb-3 flex items-center gap-2">
            <span>📝</span> About this game
          </h2>
          <p className="text-ink/75 leading-relaxed font-semibold mb-4">
            {game.description}
          </p>

          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, idx) => (
                <span key={idx} className="tech-tag px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        {game.controls && (
          <div className="slab p-6 md:p-8 mb-6 bg-sun/10">
            <h2 className="font-display text-xl text-ink mb-3 flex items-center gap-2">
              <span>🎮</span> How to Play
            </h2>
            <p className="text-ink/70 whitespace-pre-line font-semibold text-sm leading-relaxed">{game.controls}</p>
          </div>
        )}

        {/* Comments */}
        <div className="mt-8">
          <CommentSection contentSlug={slug} contentType="game" />
        </div>
      </div>
    </div>
  );
};

export default GamePlayerPage;
