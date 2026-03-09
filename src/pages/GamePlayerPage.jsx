import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameBySlug } from '../services/api';
import SEO from '../components/SEO';
import CommentSection from '../components/CommentSection';

const GamePlayerPage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGame();
  }, [slug]);

  const loadGame = async () => {
    try {
      const result = await fetchGameBySlug(slug);
      setGame(result.data.game);
    } catch (err) {
      console.error('Failed to load game:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">Game Not Found</h1>
          <p className="text-gray-400 mb-4">{error || 'The game you\'re looking for doesn\'t exist.'}</p>
          <Link to="/games" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title={`${game.title} - Play Now | Jainish Portfolio`}
        description={game.description}
        keywords={game.tags}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/games" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
          ← Back to Games
        </Link>

        {/* Game Info */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{game.title}</h1>
          <p className="text-xl text-gray-300 mb-4">{game.description}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span className="bg-game-purple/20 text-game-purple px-3 py-1 rounded-full">{game.category}</span>
            <span>{game.plays} plays</span>
            {game.rating.count > 0 && (
              <span>⭐ {game.rating.average.toFixed(1)} ({game.rating.count} ratings)</span>
            )}
          </div>
        </div>

        {/* Game Player */}
        <div className="bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={game.gamePath}
            title={game.title}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* Controls */}
        {game.controls && (
          <div className="bg-game-darker/50 border border-game-purple/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">🎮 Controls</h2>
            <p className="text-gray-300 whitespace-pre-line">{game.controls}</p>
          </div>
        )}

        {/* Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, idx) => (
                <span key={idx} className="bg-game-purple/10 text-game-purple px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section with Rating */}
        <CommentSection contentSlug={slug} contentType="game" />
      </div>
    </div>
  );
};

export default GamePlayerPage;
