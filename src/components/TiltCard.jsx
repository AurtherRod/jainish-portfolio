import React, { useRef } from 'react';

/**
 * Subtle 3D pointer-tilt wrapper. Tilts toward the cursor and lifts a touch,
 * with a soft moving sheen. Disabled for reduced-motion / touch.
 */
const TiltCard = ({ children, className = '', style = {}, max = 7 }) => {
  const ref = useRef(null);
  const reduce = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
      style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', ...style }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
