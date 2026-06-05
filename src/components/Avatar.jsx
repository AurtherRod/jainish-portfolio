import React, { useEffect, useRef, useState } from 'react';

/**
 * Hand-drawn style SVG avatar — line art in the neon/ink palette.
 * The eyes follow the cursor a little, which makes it feel alive
 * without needing a real photo. Drop in a portrait later if you want.
 *
 * Props:
 *   size   - pixel size of the square (default 200)
 *   className
 */
const Avatar = ({ size = 200, className = '' }) => {
  const wrapRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = 'ontouchstart' in window;
    let cleanup = () => {};

    if (!isMobile) {
      // Desktop: track mouse
      const onMove = (e) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const max = 2.5;
        setPupil({
          x: (dx / dist) * Math.min(max, dist / 40),
          y: (dy / dist) * Math.min(max, dist / 40),
        });
      };
      window.addEventListener('mousemove', onMove);
      cleanup = () => window.removeEventListener('mousemove', onMove);
    } else if (window.DeviceOrientationEvent) {
      // Mobile: track gyroscope tilt
      const onTilt = (e) => {
        const gamma = e.gamma || 0; // left-right tilt (-90 to 90)
        const beta = e.beta || 0;   // front-back tilt (-180 to 180)
        const max = 2.5;
        setPupil({
          x: Math.max(-max, Math.min(max, gamma / 20)),
          y: Math.max(-max, Math.min(max, (beta - 45) / 20)),
        });
      };
      window.addEventListener('deviceorientation', onTilt);
      cleanup = () => window.removeEventListener('deviceorientation', onTilt);
    } else {
      // Fallback: gentle idle animation
      let frame;
      const idle = () => {
        const t = Date.now() / 2000;
        setPupil({
          x: Math.sin(t) * 1.5,
          y: Math.cos(t * 0.7) * 1,
        });
        frame = requestAnimationFrame(idle);
      };
      idle();
      cleanup = () => cancelAnimationFrame(frame);
    }

    return cleanup;
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* soft sky disc */}
        <circle cx="100" cy="100" r="94" fill="#ffcf9e" stroke="#3b2b3a" strokeWidth="4" />

        {/* little drifting cloud behind */}
        <g opacity="0.9">
          <ellipse cx="60" cy="58" rx="20" ry="9" fill="#fff6ee" />
          <ellipse cx="76" cy="54" rx="14" ry="8" fill="#fff6ee" />
        </g>

        {/* meadow arc at the bottom of the disc */}
        <path
          d="M 8 128 C 50 112 150 112 192 128 L 192 196 L 8 196 Z"
          fill="#5fd0bd"
          opacity="0.6"
        />
        <path
          d="M 6 150 C 60 134 150 134 194 150 L 194 196 L 6 196 Z"
          fill="#2bb6a3"
          opacity="0.9"
        />

        {/* shoulders / collar */}
        <path
          d="M 50 196 C 54 162 72 150 100 150 C 128 150 146 162 150 196"
          stroke="#3b2b3a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="#ff6f91"
          fillOpacity="0.95"
        />

        {/* neck */}
        <path d="M 89 138 C 89 146 89 148 100 150 C 111 148 111 146 111 138" stroke="#3b2b3a" strokeWidth="3" strokeLinecap="round" fill="#f6c9a8" />

        {/* head */}
        <path
          d="M 66 94 C 66 67 79 52 100 52 C 121 52 134 67 134 94 C 134 117 121 132 100 132 C 79 132 66 117 66 94 Z"
          fill="#f8d2af"
          stroke="#3b2b3a"
          strokeWidth="3"
        />

        {/* ears */}
        <path d="M 66 94 C 60 92 60 104 67 104" stroke="#3b2b3a" strokeWidth="3" strokeLinecap="round" fill="#f8d2af" />
        <path d="M 134 94 C 140 92 140 104 133 104" stroke="#3b2b3a" strokeWidth="3" strokeLinecap="round" fill="#f8d2af" />

        {/* soft rosy cheeks */}
        <ellipse cx="80" cy="106" rx="6" ry="4" fill="#ff8aa6" opacity="0.65" />
        <ellipse cx="120" cy="106" rx="6" ry="4" fill="#ff8aa6" opacity="0.65" />

        {/* tousled hair */}
        <path
          d="M 64 90 C 60 58 82 42 100 43 C 122 44 140 60 138 92 C 133 74 126 66 118 63 C 122 69 121 75 119 79 C 113 66 102 62 95 63 C 99 67 98 72 97 75 C 90 64 77 65 72 73 C 75 69 77 66 79 64 C 70 67 65 76 64 90 Z"
          fill="#4a3340"
          stroke="#3b2b3a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* eyebrows */}
        <path d="M 79 88 C 83 85 90 85 94 87" stroke="#3b2b3a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 106 87 C 110 85 117 85 121 88" stroke="#3b2b3a" strokeWidth="2.4" strokeLinecap="round" />

        {/* big Ghibli eyes — whites */}
        <ellipse cx="87" cy="97" rx="6.5" ry="7" fill="#fff6ee" stroke="#3b2b3a" strokeWidth="2.2" />
        <ellipse cx="113" cy="97" rx="6.5" ry="7" fill="#fff6ee" stroke="#3b2b3a" strokeWidth="2.2" />

        {/* pupils that track the cursor */}
        <circle cx={87 + pupil.x} cy={98 + pupil.y} r="3.4" fill="#3b2b3a" />
        <circle cx={113 + pupil.x} cy={98 + pupil.y} r="3.4" fill="#3b2b3a" />
        {/* glints */}
        <circle cx={88.6 + pupil.x} cy={96 + pupil.y} r="1.1" fill="#fff6ee" />
        <circle cx={114.6 + pupil.x} cy={96 + pupil.y} r="1.1" fill="#fff6ee" />

        {/* nose */}
        <path d="M 100 101 L 98 109 C 98 110.5 102 110.5 102 109" stroke="#c98a63" strokeWidth="2" strokeLinecap="round" />

        {/* spectacles — proper rectangular frames */}
        <rect x="77" y="90" width="20" height="15" rx="5" ry="5" fill="none" stroke="#3b2b3a" strokeWidth="2.2" />
        <rect x="103" y="90" width="20" height="15" rx="5" ry="5" fill="none" stroke="#3b2b3a" strokeWidth="2.2" />
        {/* bridge */}
        <path d="M 97 95 C 99 93 101 93 103 95" stroke="#3b2b3a" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* temples to ears */}
        <path d="M 77 95 L 68 94 C 65 94 64 96 65 98" stroke="#3b2b3a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 123 95 L 132 94 C 135 94 136 96 135 98" stroke="#3b2b3a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* warm smile */}
        <path d="M 89 118 C 95 124 105 124 111 118" stroke="#3b2b3a" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Avatar;
