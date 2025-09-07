import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealElements.forEach(el => {
        revealObserver.unobserve(el);
      });
    };
  }, []);
};