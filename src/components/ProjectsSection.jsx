import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import TiltCard from './TiltCard';

const ProjectLinks = ({ project, className = '' }) => (
  <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
    {project.isPlayable && (
      <Link to={`/games/${project.id}`} className="toon-btn toon-btn--sun text-sm py-2 px-4">
        ▶ Play
      </Link>
    )}
    {project.liveUrl && (
      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="toon-btn toon-btn--ghost text-sm py-2 px-4">
        Live ↗
      </a>
    )}
    {project.github && (
      <a href={project.github} target="_blank" rel="noreferrer" className="toon-btn toon-btn--ghost text-sm py-2 px-4">
        Code ↗
      </a>
    )}
  </div>
);

const ProjectsSection = () => {
  const featured = projectsData.filter((p) => p.featured);
  const others = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* heading */}
        <div className="mb-14 scroll-reveal">
          <span className="toon-pill bg-sun mb-4"><span>🗺️</span> Quest Log</span>
          <h2 className="font-display text-5xl md:text-6xl text-ink mt-3">Main Quests</h2>
          <p className="text-ink/65 mt-2 max-w-md font-semibold">
            The big builds I'm proud of — then a few bonus mini-games you can actually play.
          </p>
        </div>

        {/* FEATURED */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {featured.map((project, index) => (
            <TiltCard key={project.id}>
              <article
                className="slab group overflow-hidden flex flex-col h-full scroll-reveal"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="art-tint h-52 md:h-60 relative">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <span className="absolute top-3 left-3 z-10 toon-pill">
                    {project.company}
                  </span>
                  {project.isPlayable && (
                    <span className="absolute top-3 right-3 z-10 toon-pill bg-sun">
                      ▶ Playable
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <h3 className="font-display text-2xl text-ink group-hover:text-meadow-deep transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-ink/70 leading-relaxed mb-6 flex-grow font-semibold">
                    {project.oneLiner}
                  </p>
                  <ProjectLinks project={project} className="mt-auto" />
                </div>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* OTHER — bonus levels */}
        {others.length > 0 && (
          <div className="scroll-reveal">
            <span className="toon-pill bg-coral text-white mb-4"><span>🎲</span> Bonus Levels</span>
            <p className="text-ink/55 text-sm mt-3 mb-6 font-semibold">Small WebGL games and experiments — go on, press play.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((project, index) => (
                <div
                  key={project.id}
                  className="slab group overflow-hidden flex flex-col scroll-reveal"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {/* game artwork */}
                  <div className="art-tint h-40 relative">
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                    {project.isPlayable && (
                      <span className="absolute top-3 right-3 z-10 toon-pill bg-sun">▶ Playable</span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-lg text-ink group-hover:text-meadow-deep transition-colors">
                        {project.title}
                      </h4>
                      {project.isPlayable && <span className="text-lg hover-wiggle">🕹️</span>}
                    </div>
                    <p className="text-ink/65 text-sm leading-relaxed mb-4 flex-grow font-semibold">
                      {project.oneLiner}
                    </p>
                    <ProjectLinks project={project} className="mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
