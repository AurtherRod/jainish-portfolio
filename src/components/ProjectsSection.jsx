import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

const ProjectsSection = () => {
  const displayedProjects = projectsData.slice(0, 9);

  return (
    <section id="projects" className="py-20 md:py-32 border-t-2 border-game-purple/20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-game-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-game-cyan/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <div className="inline-block bg-gradient-to-r from-game-purple/20 to-game-pink/20 px-6 py-2 rounded-full mb-6 border border-game-purple/30">
            <span className="text-game-purple text-sm font-bold uppercase tracking-widest">⚡ Featured Work ⚡</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Game <span className="neon-accent">Projects</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mt-4 max-w-3xl mx-auto font-medium">
            Unity games and simulators with custom mechanics, physics systems, and innovative gameplay features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="game-card rounded-2xl overflow-hidden scroll-reveal group flex flex-col"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="game-card-image relative h-72 overflow-hidden bg-game-darker flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* Playable Badge */}
                {project.isPlayable && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-game-purple to-game-pink text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 z-10 shadow-lg animate-pulse">
                    🎮 Playable
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-game-dark via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-black mb-4 bg-gradient-to-r from-game-purple via-game-pink to-game-cyan bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-5 leading-relaxed flex-grow text-base md:text-lg">
                  {project.description}
                </p>

                {/* Achievements */}
                {project.achievements && (
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {project.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/40 hover:border-green-400 transition-all"
                        >
                          ✨ {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-tag text-game-cyan text-sm font-bold px-4 py-2 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Play Button */}
                {project.isPlayable && (
                  <Link
                    to={`/games/${project.id}`}
                    className="block w-full bg-gradient-to-r from-game-purple via-game-pink to-game-purple bg-size-200 hover:bg-pos-100 text-white font-bold py-4 px-6 rounded-xl text-center transition-all mt-auto shadow-lg hover:shadow-2xl transform hover:scale-105 uppercase tracking-wider"
                    style={{ backgroundSize: '200% 100%', backgroundPosition: '0% 0%' }}
                  >
                    🎮 Play Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {projectsData.length > 9 && (
          <div className="text-center mt-16">
            <Link
              to="/projects"
              className="inline-block bg-gradient-to-r from-game-purple to-game-pink hover:from-game-pink hover:to-game-purple text-white font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-110 neon-shadow uppercase tracking-wider text-lg"
            >
              View More Projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;