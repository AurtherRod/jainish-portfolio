import React from 'react';
import { experienceData } from '../data/experience';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold">Work <span className="neon-accent">Experience</span></h2>
          <p className="text-lg text-gray-400 mt-2">My professional journey as a developer and founder.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 h-full border-l-2 border-gray-700 ml-2"></div>
          {experienceData.map((experience, index) => (
            <div key={experience.id} className={`${index === experienceData.length - 1 ? '' : 'mb-12'} pl-8 relative timeline-item scroll-reveal`}>
              <h3 className="text-2xl font-bold text-blue-400">{experience.title}</h3>
              <p className="text-lg font-semibold text-gray-300">{experience.company}</p>
              <p className="text-md text-gray-500 mb-2">{experience.period}</p>
              <p className="text-gray-400">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;