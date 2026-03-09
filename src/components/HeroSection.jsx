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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-game-purple/10 via-game-pink/10 to-game-cyan/10"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-game-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-game-cyan/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Pixel Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Title with Gaming Font */}
          <h1 className="text-7xl md:text-9xl font-black mb-6 scroll-reveal relative">
            <span className="bg-gradient-to-r from-game-purple via-game-pink to-game-cyan bg-clip-text text-transparent drop-shadow-2xl">
              Jainish Gupta
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-game-purple via-game-pink to-game-cyan opacity-20 blur-2xl -z-10"></div>
          </h1>

          {/* Typing Animation */}
          <div className="mb-10 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-semibold tracking-wide">I'm a</p>
            <div className="relative inline-block">
              <p className="text-4xl md:text-5xl font-bold neon-accent px-6 py-3 rounded-lg bg-game-purple/10 border-2 border-game-purple/30">
                {currentText}<span className="animate-pulse text-game-pink">|</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed mb-12 scroll-reveal font-medium" style={{ transitionDelay: '400ms' }}>
            Creating <span className="text-game-purple font-bold">immersive gaming experiences</span> with Unity and C#.
            Specialized in <span className="text-game-pink font-bold">gameplay mechanics</span>,
            <span className="text-game-cyan font-bold"> physics systems</span>, and technical game design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center scroll-reveal" style={{ transitionDelay: '600ms' }}>
            <a
              href="/JainishGuptaResume.pdf"
              download="JainishGuptaResume.pdf"
              className="group relative bg-gradient-to-r from-game-purple to-game-pink text-white font-bold px-10 py-5 rounded-xl uppercase tracking-wider hover:shadow-2xl transition-all transform hover:scale-105 neon-shadow inline-flex items-center justify-center overflow-hidden"
              aria-label="Download Resume"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-game-pink to-game-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>

            <a
              href="/blog"
              className="group relative border-3 border-game-cyan text-game-cyan font-bold px-10 py-5 rounded-xl uppercase tracking-wider hover:bg-game-cyan hover:text-game-dark transition-all transform hover:scale-105 pixel-corners"
            >
              <span className="relative z-10">Read Blog</span>
            </a>

            <a
              href="#projects"
              className="group relative border-3 border-game-purple text-game-purple font-bold px-10 py-5 rounded-xl uppercase tracking-wider hover:bg-game-purple hover:text-white transition-all transform hover:scale-105 pixel-corners"
            >
              <span className="relative z-10">View Projects</span>
            </a>
          </div>

          {/* Gaming Icons */}
          <div className="mt-16 flex justify-center gap-8 scroll-reveal" style={{ transitionDelay: '800ms' }}>
            <div className="text-6xl animate-float">🎮</div>
            <div className="text-6xl animate-float" style={{ animationDelay: '1s' }}>🕹️</div>
            <div className="text-6xl animate-float" style={{ animationDelay: '2s' }}>👾</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;