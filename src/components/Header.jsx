import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navbarRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.style.setProperty('background', 'rgba(17, 24, 39, 0.95)', 'important');
        } else {
          navbarRef.current.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
        }
      }

      if (location.pathname === '/') {
        const sections = ['hero', 'projects', 'about', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const { offsetTop, offsetHeight } = section;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
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
  }, [isMobileMenuOpen, location.pathname]);



  return (
    <header ref={(el) => { navbarRef.current = el; headerRef.current = el; }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect border-b border-game-purple/20" id="navbar">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleSectionClick(e, 'hero')} className="text-2xl md:text-3xl font-black tracking-wider hover:text-game-purple transition-colors bg-gradient-to-r from-game-purple to-game-pink bg-clip-text text-transparent hover:scale-105 transform duration-300">
          JG<span className="text-game-cyan">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#hero"
            onClick={(e) => handleSectionClick(e, 'hero')}
            className={`text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'hero' ? 'text-game-purple scale-110' : 'text-gray-300 hover:text-game-purple hover:scale-105'}`}
          >
            Home
          </a>
          <a
            href="#projects"
            onClick={(e) => handleSectionClick(e, 'projects')}
            className={`text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'projects' ? 'text-game-purple scale-110' : 'text-gray-300 hover:text-game-purple hover:scale-105'}`}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => handleSectionClick(e, 'about')}
            className={`text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'about' ? 'text-game-purple scale-110' : 'text-gray-300 hover:text-game-purple hover:scale-105'}`}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleSectionClick(e, 'contact')}
            className={`text-sm font-bold uppercase tracking-wider transition-all ${activeSection === 'contact' ? 'text-game-purple scale-110' : 'text-gray-300 hover:text-game-purple hover:scale-105'}`}
          >
            Contact
          </a>
          <Link to="/blog" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-game-cyan hover:scale-105 transition-all">
            Blog
          </Link>
          <a
            href="/JainishGuptaResume.pdf"
            download="JainishGuptaResume.pdf"
            className="bg-gradient-to-r from-game-purple to-game-pink text-white font-bold px-6 py-3 rounded-xl text-sm hover:from-game-pink hover:to-game-purple transition-all transform hover:scale-105 neon-shadow uppercase tracking-wider"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </nav>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 focus:outline-none p-2 hover:text-game-purple transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-6 pb-6 glass-effect border-t border-game-purple/20`}>
        <a href="#hero" onClick={(e) => handleSectionClick(e, 'hero')} className="block py-3 text-gray-300 hover:text-game-purple transition-colors rounded-lg hover:bg-game-purple/10 mx-2 text-center font-bold uppercase tracking-wider">Home</a>
        <a href="#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="block py-3 text-gray-300 hover:text-game-purple transition-colors rounded-lg hover:bg-game-purple/10 mx-2 text-center font-bold uppercase tracking-wider">Projects</a>
        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="block py-3 text-gray-300 hover:text-game-purple transition-colors rounded-lg hover:bg-game-purple/10 mx-2 text-center font-bold uppercase tracking-wider">About</a>
        <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="block py-3 text-gray-300 hover:text-game-purple transition-colors rounded-lg hover:bg-game-purple/10 mx-2 text-center font-bold uppercase tracking-wider">Contact</a>
        <Link to="/blog" className="block py-3 text-gray-300 hover:text-game-cyan transition-colors rounded-lg hover:bg-game-cyan/10 mx-2 text-center font-bold uppercase tracking-wider">Blog</Link>
        <a
          href="/JainishGuptaResume.pdf"
          download="JainishGuptaResume.pdf"
          className="block mt-4 mx-2 bg-gradient-to-r from-game-purple to-game-pink text-white font-bold px-6 py-3 rounded-xl text-center hover:from-game-pink hover:to-game-purple transition-all neon-shadow uppercase tracking-wider"
          aria-label="Download Resume"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
};

export default Header;