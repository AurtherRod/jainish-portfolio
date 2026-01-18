import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

const ProjectsSection = () => {
  const displayedProjects = projectsData.slice(0, 9);
  
  return (
    <section id="projects" className="py-20 md:py-32 border-t-2 border-blue-400/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-block bg-blue-500/10 px-4 py-1 rounded-full mb-4">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Game <span className="neon-accent">Projects</span></h2>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Unity games and simulators with custom mechanics, physics systems, and innovative gameplay features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <div key={project.id} className="card-hover rounded-2xl overflow-hidden scroll-reveal group flex flex-col transition-transform duration-300 hover:scale-105" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="relative h-64 overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {project.isPlayable && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                    🎮 Playable
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{project.description}</p>

                {project.achievements && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.achievements.map((achievement, index) => (
                        <span key={index} className="bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full border border-green-500/30">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.isPlayable && (
                  <Link
                    to={`/games/${project.id}`}
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all mt-auto"
                  >
                    🎮 Play Now
                  </Link>
                )}

              </div>
            </div>
          ))}
        </div>

        {projectsData.length > 9 && (
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 neon-shadow"
            >
              View More Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;