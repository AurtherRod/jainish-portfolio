import React from 'react';
import { experienceData } from '../data/experience';
import { EXPERIENCE_TYPES } from '../constants';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 border-t-2 border-indigo-400/20 bg-gradient-to-b from-transparent to-indigo-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-block bg-indigo-500/10 px-4 py-1 rounded-full mb-4">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work <span className="neon-accent">Experience</span></h2>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">My professional journey as a Unity game developer creating immersive experiences and innovative gameplay mechanics.</p>
        </div>

        {/* Game Development Experience */}
        <div className="max-w-3xl mx-auto mb-20">
          <h3 className="text-3xl font-bold mb-8 scroll-reveal">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Game Development Journey</span>
          </h3>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
            {experienceData.filter(exp => exp.type === EXPERIENCE_TYPES.GAME_DEV).map((experience, index, arr) => (
              <div key={experience.id} className={`${index === arr.length - 1 ? '' : 'mb-12'} pl-8 relative scroll-reveal`}>
                <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -ml-1.5 mt-2 ring-4 ring-blue-500/20"></div>
                <h4 className="text-2xl font-bold text-blue-400">{experience.title}</h4>
                <p className="text-lg font-semibold text-gray-300">{experience.company}</p>
                <p className="text-sm text-gray-500 mb-3">{experience.period}</p>
                <div className="text-gray-400 space-y-1">
                  {experience.description.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entrepreneurship Experience */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 scroll-reveal">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Entrepreneurship Journey</span>
          </h3>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
            {experienceData.filter(exp => exp.type === EXPERIENCE_TYPES.ENTREPRENEURSHIP).map((experience, index, arr) => (
              <div key={experience.id} className={`${index === arr.length - 1 ? '' : 'mb-12'} pl-8 relative scroll-reveal`}>
                <div className="absolute left-0 w-3 h-3 bg-purple-500 rounded-full -ml-1.5 mt-2 ring-4 ring-purple-500/20"></div>
                <h4 className="text-2xl font-bold text-purple-400">{experience.title}</h4>
                <p className="text-lg font-semibold text-gray-300">{experience.company}</p>
                <p className="text-sm text-gray-500 mb-3">{experience.period}</p>
                <div className="text-gray-400 space-y-1">
                  {experience.description.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;