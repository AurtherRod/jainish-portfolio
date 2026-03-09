import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { fetchGames } from '../services/api';
import { projectsData } from '../data/projects';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const result = await fetchGames();
      setGames(result.data.games);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter out playable games from static projects data (non-game projects)
  const nonGameProjects = projectsData.filter(p => !p.isPlayable);

  return (
    <>
      <SEO
        title="Games & Projects - Unity WebGL Games Showcase"
        description="Play my collection of Unity WebGL games and explore my development projects."
        keywords={['Unity games', 'WebGL games', 'browser games', 'game development', 'portfolio']}
      />

      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-20">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
            ← Back to Portfolio
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              All <span className="neon-accent">Projects</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my complete portfolio of Unity games and development projects
            </p>
          </div>

          {/* Playable Games Section */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent mx-auto"></div>
            </div>
          ) : games.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">🎮 Playable Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {games.map((game, index) => (
                  <div
                    key={game._id}
                    className="card-hover rounded-2xl overflow-hidden group flex flex-col transition-transform duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-56 overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                        🎮 Playable
                      </div>
                      {game.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                        {game.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <span className="bg-game-purple/20 text-game-purple px-3 py-1 rounded-full">
                          {game.category}
                        </span>
                        <span>{game.plays} plays</span>
                        {game.rating.count > 0 && (
                          <span>⭐ {game.rating.average.toFixed(1)}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/games/${game.slug}`}
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105 neon-shadow mt-auto"
                      >
                        🎮 Play Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Projects Section */}
          {nonGameProjects.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">💼 Other Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {nonGameProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="card-hover rounded-2xl overflow-hidden group flex flex-col transition-transform duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-56 overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {project.achievements && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.achievements.map((achievement, idx) => (
                              <span key={idx} className="bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full border border-green-500/30">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105 mt-auto"
                        >
                          🔗 View Project
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesPage;
