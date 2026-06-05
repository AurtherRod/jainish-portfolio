import React from 'react';

const Footer = () => {
  return (
    <footer className="relative pb-10 pt-4 z-10">
      <div className="container mx-auto px-6">
        <div className="slab bg-cream px-6 py-5 flex flex-col items-center text-center gap-4">
          <span className="font-display text-ink flex items-center gap-2">
            <span className="text-lg">🌱</span> © {new Date().getFullYear()} Jainish Gupta
          </span>
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="toon-pill bg-cream hover-wiggle">LinkedIn</a>
            <a href="https://github.com/AurtherRod" target="_blank" rel="noreferrer" className="toon-pill bg-cream hover-wiggle">GitHub</a>
            <a href="mailto:jainishgupta2000@gmail.com" className="toon-pill bg-cream hover-wiggle">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
