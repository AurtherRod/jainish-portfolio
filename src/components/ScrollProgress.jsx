import React, { useEffect, useState } from 'react';

/**
 * A slim meadow-green progress bar at the very top of the page,
 * plus a friendly back-to-top sprout that pops in once you scroll.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(pct);
        setShowTop(scrollTop > 600);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1.5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-meadow via-sun to-coral transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%`, boxShadow: '0 1px 6px rgba(58,47,35,0.3)' }}
        />
      </div>

      {/* back-to-top sprout */}
      <button
        onClick={toTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-sun border-[3px] border-ink shadow-[4px_4px_0_0_var(--ink)] flex items-center justify-center text-ink transition-all duration-300 hover:bg-meadow hover:text-white active:translate-y-1 active:shadow-[2px_2px_0_0_var(--ink)] ${
          showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 20V9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 9c-1.2-2.6-3.6-3.4-5.6-3.2.1 2.4 1.6 4.4 5.6 4.4" fill="currentColor" opacity="0.85" />
          <path d="M12 11c1-2.2 3-3 4.8-2.8-.1 2-1.4 3.8-4.8 3.8" fill="currentColor" opacity="0.85" />
          <path d="M8 18l4-4 4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
};

export default ScrollProgress;
