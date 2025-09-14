import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navbarRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, sectionId) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
        <a href="#hero" className="text-2xl font-bold tracking-wider hover:text-blue-400 transition-colors">Jainish Gupta</a>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</Link>

          <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
          <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
        </nav>
        <div className="hidden md:flex space-x-4">
          <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="border neon-border text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 hover:shadow-lg neon-shadow">
            LinkedIn
          </a>
          <a href="https://github.com/AurtherRod" target="_blank" rel="noreferrer" className="border neon-border text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 hover:shadow-lg neon-shadow">
            GitHub
          </a>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 focus:outline-none p-2 hover:text-blue-400 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-6 pb-6 text-center glass-effect border-t border-blue-400/20`}>
        <Link to="/" onClick={handleMobileMenuClick} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">Home</Link>
        <a href="#projects" onClick={(e) => { handleSectionClick(e, 'projects'); handleMobileMenuClick(); }} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">Projects</a>
        <a href="#experience" onClick={(e) => { handleSectionClick(e, 'experience'); handleMobileMenuClick(); }} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">Experience</a>
        <Link to="/blog" onClick={handleMobileMenuClick} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">Blog</Link>
        <a href="#about" onClick={(e) => { handleSectionClick(e, 'about'); handleMobileMenuClick(); }} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">About</a>
        <a href="#contact" onClick={(e) => { handleSectionClick(e, 'contact'); handleMobileMenuClick(); }} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2">Contact</a>
        <div className="flex gap-2 mt-4">
          <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="flex-1 border neon-border text-blue-400 px-4 py-3 rounded-full hover:bg-blue-400 hover:text-gray-900 transition-all text-center font-medium">
            LinkedIn
          </a>
          <a href="https://github.com/AurtherRod" target="_blank" rel="noreferrer" className="flex-1 border neon-border text-blue-400 px-4 py-3 rounded-full hover:bg-blue-400 hover:text-gray-900 transition-all text-center font-medium">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;