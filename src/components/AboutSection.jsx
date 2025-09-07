import React from 'react';

const AboutSection = () => {
  const skills = ["Unity 3D (2D/3D)", "C#", "Node.js", "MongoDB", "RESTful APIs", "Editor Scripting", "Process & Tools: Git, Agile/Scrum, Team Collaboration, WebSockets"];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 scroll-reveal">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="neon-accent">Me</span></h2>
            <p className="text-gray-400 text-lg">A highly skilled Full-Stack Game Developer specializing in building complete interactive experiences, from engaging front-end gameplay in Unity/C# to the robust backend services that power them. My experience architecting secure, scalable systems with Node.js as a CTO for a fintech platform gives me a unique advantage in developing the online features essential for modern games, such as player accounts, inventories, and real-time data services. With a portfolio of shipped titles including blockchain games and mobile hits with 300,000+ downloads, I am eager to apply my deep technical expertise to a hands-on development role and build the next generation of immersive games.</p>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">Core <span className="neon-accent">Competencies</span></h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <span key={index} className="tech-tag text-blue-300 text-base font-semibold px-4 py-2 rounded-lg">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;