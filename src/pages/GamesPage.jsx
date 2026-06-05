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
          <Link to="/" className="inline-flex items-center text-meadow-deep hover:text-meadow font-semibold mb-8 transition-colors">
            ← Back to Portfolio
          </Link>

          <div className="mb-16">
            <span className="toon-pill bg-sun mb-4"><span>🗺️</span> Quest Log</span>
            <h1 className="font-display text-5xl md:text-6xl text-ink mt-3 mb-4">
              All <span className="text-meadow-deep">Projects</span>
            </h1>
            <p className="text-lg text-ink/70 max-w-2xl font-semibold">
              Explore my complete portfolio of builds, simulations, and playable WebGL games.
            </p>
          </div>

          {/* Playable Games Section */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-meadow border-t-transparent mx-auto"></div>
            </div>
          ) : games.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink mb-8 flex items-center gap-2">🎮 Playable Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl">
                {games.map((game) => (
                  <div
                    key={game._id}
                    className="slab group overflow-hidden flex flex-col"
                  >
                    <div className="art-tint relative h-56 flex-shrink-0">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                      />
                      <span className="absolute top-3 right-3 z-10 toon-pill bg-sun">▶ Playable</span>
                      {game.featured && (
                        <span className="absolute top-3 left-3 z-10 toon-pill bg-coral text-white">⭐ Featured</span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="font-display text-2xl text-ink mb-3 group-hover:text-meadow-deep transition-colors">
                        {game.title}
                      </h2>
                      <p className="text-ink/70 mb-4 leading-relaxed flex-grow font-semibold text-sm">
                        {game.description}
                      </p>

                      <div className="flex items-center gap-3 mb-4 text-xs text-ink/55 font-semibold">
                        <span className="toon-pill bg-sky">{game.category}</span>
                        <span>{game.plays} plays</span>
                        {game.rating.count > 0 && (
                          <span>⭐ {game.rating.average.toFixed(1)}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {game.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="tech-tag px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/games/${game.slug}`}
                        className="toon-btn toon-btn--sun w-full mt-auto"
                      >
                        ▶ Play Now
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
              <h2 className="font-display text-3xl text-ink mb-8 flex items-center gap-2">💼 Other Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl">
                {nonGameProjects.map((project) => (
                  <div
                    key={project.id}
                    className="slab group overflow-hidden flex flex-col"
                  >
                    <div className="art-tint relative h-56 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="font-display text-2xl text-ink mb-3 group-hover:text-meadow-deep transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-ink/70 mb-4 leading-relaxed flex-grow font-semibold text-sm">
                        {project.description}
                      </p>

                      {project.achievements && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.achievements.map((achievement, idx) => (
                              <span key={idx} className="toon-pill bg-meadow text-white text-[0.68rem]">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="toon-btn w-full mt-auto"
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
