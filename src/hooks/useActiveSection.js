import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useActiveSection = (sections = ['hero', 'projects', 'about', 'contact']) => {
    const [activeSection, setActiveSection] = useState(sections[0]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/') return;

        const handleScroll = () => {
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
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, sections]);

    return activeSection;
};
