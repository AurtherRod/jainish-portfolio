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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Backend <span className="neon-accent">Projects</span></h2>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Scalable systems and APIs powering real-world applications with measurable impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="card-hover rounded-2xl overflow-hidden scroll-reveal group" style={{transitionDelay: project.delay}}>
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
                
                {(project.github || project.liveUrl) && (
                  <div className="pt-3 border-t border-gray-700 flex flex-wrap gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                        aria-label={`View ${project.title} code on GitHub`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        <span>View Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;