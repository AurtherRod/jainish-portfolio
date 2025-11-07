import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = ['Game Developer', 'Unity & C# Specialist', 'Technical Game Designer'];
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-6 scroll-reveal">
            Jainish Gupta
          </h1>
          <div className="mb-8 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-2">I'm a</p>
            <p className="text-3xl md:text-4xl font-bold">
              <span className="neon-accent">{currentText}<span className="animate-pulse text-blue-400">|</span></span>
            </p>
          </div>
          <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed mb-12 scroll-reveal" style={{ transitionDelay: '400ms' }}>
            Creating immersive gaming experiences with Unity and C#. Specialized in gameplay mechanics, physics systems, and technical game design. Experienced in building scalable game architectures and optimizing performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal" style={{ transitionDelay: '600ms' }}>
            <a 
              href="/JainishGuptaResume.pdf" 
              download="JainishGuptaResume.pdf"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 neon-shadow inline-flex items-center justify-center"
              aria-label="Download Resume"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
            <a href="/blog" className="border-2 border-blue-400 text-blue-400 font-bold px-10 py-4 rounded-full uppercase tracking-wider hover:bg-blue-400 hover:text-gray-900 transition-all transform hover:scale-105">
              Read Blog
            </a>
            <a href="#projects" className="border-2 border-purple-400 text-purple-400 font-bold px-10 py-4 rounded-full uppercase tracking-wider hover:bg-purple-400 hover:text-gray-900 transition-all transform hover:scale-105">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;