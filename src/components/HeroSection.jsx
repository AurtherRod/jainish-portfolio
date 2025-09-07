import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = ['Game Developer', 'Backend Engineer', 'Founder'];
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
            Crafting immersive digital experiences through game development, backend engineering, and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal" style={{ transitionDelay: '600ms' }}>
            <a href="#projects" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-10 py-4 rounded-full uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 neon-shadow">
              View My Work
            </a>
            <a href="#contact" className="border-2 border-blue-400 text-blue-400 font-bold px-10 py-4 rounded-full uppercase tracking-wider hover:bg-blue-400 hover:text-gray-900 transition-all transform hover:scale-105">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;