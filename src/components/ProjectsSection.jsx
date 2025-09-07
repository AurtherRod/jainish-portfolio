import React from 'react';
import { projectsData } from '../data/projects';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold">My <span className="neon-accent">Creations</span></h2>
          <p className="text-lg text-gray-400 mt-2">A selection of my professional projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 scroll-reveal project-card" style={{transitionDelay: project.delay}}>
              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 transition-opacity duration-300 project-overlay">
                  <span className="text-white border-2 border-green-400 px-6 py-2 rounded-lg">{project.company}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-700 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">{tech}</span>
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