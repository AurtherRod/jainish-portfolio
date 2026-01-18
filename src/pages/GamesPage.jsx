import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { projectsData } from '../data/projects';

const GamesPage = () => {
  return (
    <>
      <SEO 
        title="Games - Unity WebGL Games Showcase"
        description="Play my collection of Unity WebGL games including Car Race, Memory Game, and Space Shooter."
        keywords={['Unity games', 'WebGL games', 'browser games', 'game development']}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projectsData.map((project, index) => (
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
                  {project.isPlayable && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                      🎮 Playable
                    </div>
                  )}
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

                  {project.isPlayable && (
                    <Link
                      to={`/games/${project.id}`}
                      className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105 neon-shadow mt-auto"
                    >
                      🎮 Play Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesPage;
