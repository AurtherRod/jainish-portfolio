import React, { useEffect, useRef } from 'react';

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navbarRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.style.setProperty('background', 'rgba(17, 24, 39, 0.8)', 'important');
        } else {
          navbarRef.current.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
        }
      }
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header ref={(el) => { navbarRef.current = el; headerRef.current = el; }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect" id="navbar">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold tracking-wider hover:text-green-400 transition-colors">Jainish Gupta</a>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="text-gray-300 hover:text-green-400 transition-colors">Home</a>
          <a href="#projects" className="text-gray-300 hover:text-green-400 transition-colors">Projects</a>
          <a href="#experience" className="text-gray-300 hover:text-green-400 transition-colors">Experience</a>
          <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">About</a>
          <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a>
        </nav>
        <a href="https://github.com/jainish-username" target="_blank" rel="noreferrer" className="hidden md:block border neon-border text-green-400 px-4 py-2 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all duration-300 hover:shadow-lg neon-shadow">
          GitHub
        </a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 focus:outline-none p-2 hover:text-green-400 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      <div className={`${isMobileMenuOpen ? 'block animate-fade-in' : 'hidden'} md:hidden px-6 pb-4 text-center bg-gray-900 bg-opacity-95 backdrop-blur-sm`}>
        <a href="#hero" onClick={handleMobileMenuClick} className="block py-2 text-gray-300 hover:text-green-400">Home</a>
        <a href="#projects" onClick={handleMobileMenuClick} className="block py-2 text-gray-300 hover:text-green-400">Projects</a>
        <a href="#experience" onClick={handleMobileMenuClick} className="block py-2 text-gray-300 hover:text-green-400">Experience</a>
        <a href="#about" onClick={handleMobileMenuClick} className="block py-2 text-gray-300 hover:text-green-400">About</a>
        <a href="#contact" onClick={handleMobileMenuClick} className="block py-2 text-gray-300 hover:text-green-400">Contact</a>
        <a href="https://github.com/jainish-username" target="_blank" rel="noreferrer" className="block mt-2 border neon-border text-green-400 px-4 py-2 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all text-center">
          GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;