import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useSmoothScroll = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = useCallback((sectionId, onComplete) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                element?.scrollIntoView({ behavior: 'smooth' });
                onComplete?.();
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            element?.scrollIntoView({ behavior: 'smooth' });
            onComplete?.();
        }
    }, [navigate, location.pathname]);

    return scrollToSection;
};
