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
          navbarRef.current.style.setProperty('background', 'transparent', 'important');
        } else {
          navbarRef.current.style.setProperty('background', 'transparent', 'important');
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

  const navLinkClass = (sectionId) =>
    `font-mono text-sm px-4 py-2 rounded-full border-[2.5px] transition-all duration-150 ${
      activeSection === sectionId
        ? 'text-white bg-meadow border-ink shadow-[2px_2px_0_0_var(--ink)]'
        : 'text-ink/70 border-transparent hover:text-ink hover:border-ink hover:bg-cream'
    }`;

  return (
    <header ref={(el) => { navbarRef.current = el; headerRef.current = el; }} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleSectionClick(e, 'hero')} className="font-display text-2xl text-ink bg-cream border-[3px] border-ink rounded-full w-12 h-12 flex items-center justify-center shadow-[3px_3px_0_0_var(--ink)] hover:rotate-[-6deg] transition-transform">
          JG
        </a>

        <nav className="hidden md:flex items-center gap-2 bg-cream/70 backdrop-blur border-[2.5px] border-ink rounded-full px-2 py-1.5 shadow-[3px_3px_0_0_var(--ink)]">
          <a href="#projects" onClick={(e) => handleSectionClick(e, 'projects')} className={navLinkClass('projects')}>
            work
          </a>
          <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className={navLinkClass('about')}>
            about
          </a>
          <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className={navLinkClass('contact')}>
            contact
          </a>
          <Link to="/blog" className="font-mono text-sm px-4 py-2 rounded-full border-[2.5px] border-transparent text-ink/70 hover:text-ink hover:border-ink hover:bg-cream transition-all">
            notes
          </Link>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-ink bg-cream border-[3px] border-ink rounded-full w-11 h-11 flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)] focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center">
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mx-4 mb-2 px-4 py-4 bg-cream border-[3px] border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)]`}>
        <a href="#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="block py-2.5 px-4 my-1 rounded-full font-mono text-ink hover:bg-meadow hover:text-white transition-colors">work</a>
        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="block py-2.5 px-4 my-1 rounded-full font-mono text-ink hover:bg-meadow hover:text-white transition-colors">about</a>
        <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="block py-2.5 px-4 my-1 rounded-full font-mono text-ink hover:bg-meadow hover:text-white transition-colors">contact</a>
        <Link to="/blog" className="block py-2.5 px-4 my-1 rounded-full font-mono text-ink hover:bg-meadow hover:text-white transition-colors">notes</Link>
      </div>
    </header>
  );
};

export default Header;
