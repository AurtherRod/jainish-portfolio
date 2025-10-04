import React from 'react';

const AboutSection = () => {
  const backendSkills = ["Node.js", "Express.js", "REST APIs", "Microservices", "MongoDB", "Docker", "Git", "JavaScript", "Python", "Agile/Scrum", "AWS/Azure"];
  const additionalSkills = ["WebSockets", "Payment APIs", "Real-time Systems", "Database Design", "System Architecture"];

  return (
    <section id="about" className="py-20 md:py-32 border-t-2 border-green-400/20 bg-gradient-to-b from-transparent to-green-900/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 scroll-reveal">
          <div className="lg:w-1/2">
            <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Background</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="neon-accent">Me</span></h2>
            <p className="text-gray-400 text-lg">Experienced Software Developer and CTO with 3+ years specializing in secure, scalable systems using Node.js and MongoDB. Led the architecture of fintech platforms processing 1000+ daily transactions with 99.9% uptime. Proven track record as a technical leader, having scaled systems to support 500+ institutions and mentored development teams. Expert in building robust APIs, microservices, and real-time systems that power mission-critical applications.</p>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">Technical <span className="neon-accent">Skills</span></h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-blue-300">Backend & Infrastructure</h4>
              <div className="flex flex-wrap gap-3">
                {backendSkills.map((skill, index) => (
                  <span key={index} className="tech-tag text-blue-300 text-sm font-semibold px-3 py-2 rounded-lg">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-300">Specialized Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {additionalSkills.map((skill, index) => (
                  <span key={index} className="tech-tag text-purple-300 text-sm font-semibold px-3 py-2 rounded-lg">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;