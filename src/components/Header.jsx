import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navbarRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');

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
      
      // Active section detection
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
  }, [isMobileMenuOpen, setIsMobileMenuOpen, location.pathname]);



  return (
    <header ref={(el) => { navbarRef.current = el; headerRef.current = el; }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect" id="navbar">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleSectionClick(e, 'hero')} className="text-2xl font-bold tracking-wider hover:text-blue-400 transition-colors">Jainish Gupta</a>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#hero" 
            onClick={(e) => handleSectionClick(e, 'hero')} 
            className={`text-sm font-medium transition-colors ${activeSection === 'hero' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Home
          </a>
          <a 
            href="#projects" 
            onClick={(e) => handleSectionClick(e, 'projects')} 
            className={`text-sm font-medium transition-colors ${activeSection === 'projects' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Projects
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleSectionClick(e, 'about')} 
            className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Skills
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleSectionClick(e, 'about')} 
            className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            About
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleSectionClick(e, 'contact')} 
            className={`text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Contact
          </a>
          <Link to="/blog" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
            Blog
          </Link>
          <a 
            href="/JainishGuptaResume.pdf" 
            download="JainishGuptaResume.pdf"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-5 py-2 rounded-full text-sm hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 neon-shadow"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </nav>
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
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-6 pb-6 glass-effect border-t border-blue-400/20`}>
        <a href="#hero" onClick={(e) => handleSectionClick(e, 'hero')} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">Home</a>
        <a href="#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">Projects</a>
        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">Skills</a>
        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">About</a>
        <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">Contact</a>
        <Link to="/blog" className="block py-3 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-400/10 mx-2 text-center">Blog</Link>
        <a 
          href="/JainishGuptaResume.pdf" 
          download="JainishGuptaResume.pdf"
          className="block mt-4 mx-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-3 rounded-full text-center hover:from-blue-500 hover:to-purple-500 transition-all neon-shadow"
          aria-label="Download Resume"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
};

export default Header;