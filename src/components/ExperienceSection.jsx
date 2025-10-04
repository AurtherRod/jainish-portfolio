import React from 'react';
import { experienceData } from '../data/experience';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 border-t-2 border-indigo-400/20 bg-gradient-to-b from-transparent to-indigo-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-block bg-indigo-500/10 px-4 py-1 rounded-full mb-4">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work <span className="neon-accent">Experience</span></h2>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">My professional journey as a software developer, CTO, and technical founder.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 h-full border-l-2 border-gray-700 ml-2"></div>
          {experienceData.map((experience, index) => (
            <div key={experience.id} className={`${index === experienceData.length - 1 ? '' : 'mb-12'} pl-8 relative timeline-item scroll-reveal`}>
              <h3 className="text-2xl font-bold text-blue-400">{experience.title}</h3>
              <p className="text-lg font-semibold text-gray-300">{experience.company}</p>
              <p className="text-md text-gray-500 mb-2">{experience.period}</p>
              <div className="text-gray-400">
                {experience.description.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex} className={lineIndex > 0 ? 'mt-1' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;