import React, { useEffect, useRef, useState } from 'react';

/**
 * Ghibli-style atmosphere with gentle scroll parallax:
 *  - a warm sun that glows up top
 *  - soft clouds drifting + parallaxing
 *  - layered rolling hills that move at different speeds
 *  - pollen / dust motes floating up (canvas)
 *  - a couple of birds gliding past now and then
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const cloudsRef = useRef(null);
  const sunRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    setIsLowPerformance(isMobile || hasLowMemory);
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  /* scroll parallax */
  useEffect(() => {
    if (reduceMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (sunRef.current) sunRef.current.style.transform = `translateY(${y * 0.15}px)`;
        if (cloudsRef.current) cloudsRef.current.style.transform = `translateY(${y * 0.08}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduceMotion]);

  /* floating motes */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let motes = [];
    let lastTime = 0;
    const fps = 30;
    const fpsInterval = 1000 / fps;

    const palette = [
      'rgba(255, 194, 75,',  // golden
      'rgba(255, 255, 255,', // cream
      'rgba(255, 111, 145,', // sunset pink
      'rgba(184, 156, 255,', // lavender
    ];

    class Mote {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
        this.size = Math.random() * 3 + 1.5;
        this.drift = Math.random() * 0.4 - 0.2;
        this.rise = Math.random() * 0.5 + 0.2;
        this.sway = Math.random() * 0.02 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.opacity = Math.random() * 0.5 + 0.25;
        this.twinkle = Math.random() * 0.02 + 0.005;
      }
      update() {
        this.phase += this.sway;
        this.x += this.drift + Math.sin(this.phase) * 0.4;
        this.y -= this.rise;
        this.opacity += Math.sin(this.phase * 2) * this.twinkle;
        if (this.y < -10) this.reset();
      }
      draw() {
        const o = Math.max(0.1, Math.min(0.75, this.opacity));
        ctx.fillStyle = `${this.color} ${o})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `${this.color} ${o * 0.25})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      motes = [];
      const baseCount = isLowPerformance ? 18 : 38;
      const count = Math.min(baseCount, Math.floor((canvas.width * canvas.height) / 38000));
      for (let i = 0; i < count; i++) motes.push(new Mote());
    };

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      motes.forEach((m) => { m.update(); m.draw(); });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowPerformance, reduceMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* warm sun with a soft halo */}
      <div ref={sunRef} className="absolute" style={{ top: '8%', right: '12%', willChange: 'transform' }}>
        <div className="relative">
          <div className="w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle, #fff1c2 0%, #ff9a4d 58%, rgba(255,154,77,0) 72%)' }} />
          <div className="absolute inset-0 -m-16 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(255,154,77,0.4) 0%, rgba(255,154,77,0) 65%)' }} />
        </div>
      </div>

      {/* drifting clouds */}
      <div ref={cloudsRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        <div className="cloud" style={{ top: '12%', width: '120px', height: '34px', animation: reduceMotion ? 'none' : 'drift 70s linear infinite' }} />
        <div className="cloud" style={{ top: '22%', width: '90px', height: '26px', animation: reduceMotion ? 'none' : 'drift 95s linear infinite', animationDelay: '-30s' }} />
        <div className="cloud" style={{ top: '6%', width: '150px', height: '40px', animation: reduceMotion ? 'none' : 'drift 120s linear infinite', animationDelay: '-60s' }} />
        <div className="cloud" style={{ top: '34%', width: '70px', height: '20px', animation: reduceMotion ? 'none' : 'drift 110s linear infinite', animationDelay: '-15s' }} />
      </div>

      {/* gliding birds */}
      {!reduceMotion && (
        <div className="absolute" style={{ top: '18%', left: 0, animation: 'flyacross 38s linear infinite' }}>
          <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-50">
            <path d="M2 10 Q8 2 14 10 Q20 2 26 10" stroke="#5f5340" strokeWidth="1.6" fill="none" strokeLinecap="round" className="bird-wing" />
            <path d="M32 13 Q37 7 42 13 Q47 7 52 13" stroke="#5f5340" strokeWidth="1.4" fill="none" strokeLinecap="round" className="bird-wing" style={{ animationDelay: '0.2s' }} />
          </svg>
        </div>
      )}

      {/* floating pollen / motes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.9 }} />

      {/* rolling hills — teal-green, deepening toward the front */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ height: '20vh', minHeight: '120px' }}>
        <path fill="#7fd6c4" fillOpacity="0.55" d="M0,80 C240,40 420,120 720,88 C1020,56 1200,120 1440,72 L1440,160 L0,160 Z" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ height: '15vh', minHeight: '95px' }}>
        <path fill="#3fbfa8" fillOpacity="0.85" d="M0,104 C260,64 480,128 760,96 C1040,64 1240,128 1440,96 L1440,160 L0,160 Z" />
      </svg>

      {/* tiny trees — separate layer so they keep their shape (no stretch) */}
      <div className="absolute bottom-[8vh] left-[14%]" style={{ willChange: 'transform' }}>
        <svg width="34" height="40" viewBox="0 0 34 40" className="animate-sway">
          <rect x="14" y="22" width="6" height="16" rx="2" fill="#7a4a3a" />
          <ellipse cx="17" cy="16" rx="15" ry="16" fill="#1f9e8d" />
          <ellipse cx="11" cy="13" rx="7" ry="7" fill="#37c2ae" />
        </svg>
      </div>
      <div className="absolute bottom-[7vh] right-[18%]" style={{ willChange: 'transform' }}>
        <svg width="26" height="32" viewBox="0 0 26 32" className="animate-sway" style={{ animationDelay: '1.5s' }}>
          <rect x="10" y="18" width="5" height="13" rx="2" fill="#7a4a3a" />
          <ellipse cx="12" cy="13" rx="12" ry="13" fill="#1f9e8d" />
        </svg>
      </div>
    </div>
  );
};

export default ParticleBackground;
