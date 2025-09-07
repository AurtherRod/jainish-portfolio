import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = ['Game Developer', 'Backend Engineer', 'Technical Co-Founder'];
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
    <section id="hero" className="min-h-screen flex items-center bg-cover bg-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest scroll-reveal">Jainish Gupta</h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-300 scroll-reveal" style={{ transitionDelay: '200ms' }}> <span className="neon-accent font-bold">{currentText}<span className="animate-pulse">|</span></span></p>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-400 scroll-reveal" style={{ transitionDelay: '400ms' }}>Specializing in Unity 3D, C#, Node.js, and MongoDB to build immersive games and high-fidelity simulations.</p>
        <a href="#projects" className="mt-8 inline-block bg-green-500 text-gray-900 font-bold px-8 py-4 rounded-lg uppercase tracking-wider hover:bg-green-400 transition-transform transform hover:scale-105 hover:shadow-lg neon-shadow scroll-reveal" style={{ transitionDelay: '600ms' }}>View My Work</a>
      </div>
    </section>
  );
};

export default HeroSection;