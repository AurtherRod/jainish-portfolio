import React from 'react';

const AboutSection = () => {
  const skills = ["Unity 3D (2D/3D)", "C#", "Node.js", "MongoDB", "RESTful APIs", "Editor Scripting", "Git", "Agile/Scrum"];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 scroll-reveal">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="neon-accent">Me</span></h2>
            <p className="text-gray-400 text-lg mb-4">I'm a highly motivated and results-oriented Game Developer with a proven track record in the design, development, and optimization of game mechanics, levels, and user experiences. I thrive in collaborative environments and am passionate about bringing creative ideas to life.</p>
            <p className="text-gray-400 text-lg">From building blockchain games with complex backend systems to creating high-fidelity industrial simulations, I enjoy tackling challenges and pushing the boundaries of interactive entertainment.</p>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6">Core <span className="neon-accent">Competencies</span></h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 border neon-border text-green-400 text-base font-semibold px-4 py-2 rounded-lg">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;