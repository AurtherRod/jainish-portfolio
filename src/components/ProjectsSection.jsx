import React from 'react';
import { projectsData } from '../data/projects';
import OptimizedImage from './OptimizedImage';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 border-t-2 border-blue-400/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-block bg-blue-500/10 px-4 py-1 rounded-full mb-4">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Project <span className="neon-accent">Section</span></h2>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Scalable systems and APIs powering real-world applications with measurable impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="card-hover rounded-2xl overflow-hidden scroll-reveal group" style={{ transitionDelay: project.delay }}>
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={256}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                      {project.company}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {project.title}
                </h3>

                {/* Project Impact Statement */}
                {project.achievements && (
                  <div className="mb-4 p-3 bg-blue-900/30 border-l-4 border-blue-400 rounded">
                    <p className="text-blue-200 text-sm font-semibold">Impact:</p>
                    <p className="text-gray-300 text-sm">{project.achievements.join(' • ')}</p>
                  </div>
                )}

                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

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


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;