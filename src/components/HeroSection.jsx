import React from 'react';
import Avatar from './Avatar';

const stats = [
  { label: 'XP', value: '3+ yrs', icon: '⭐' },
  { label: 'Shipped', value: 'Fintech', icon: '💸' },
  { label: 'Boss fights', value: 'Tata · JSW', icon: '🏭' },
];

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* HUD top strip */}
        <div className="flex items-center justify-between mb-12 scroll-reveal">
          <span className="toon-pill"><span>🎮</span> Player One</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl order-2 lg:order-1">
            <p className="font-display text-meadow-deep text-lg mb-4 scroll-reveal">
              Jainish Gupta — Software Engineer
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] text-ink scroll-reveal">
              I design and build the{' '}
              <span className="text-meadow-deep toon-outline" style={{ WebkitTextStrokeColor: 'var(--ink)' }}>systems</span>
              {' '}that products depend on.
            </h1>

            <p className="mt-7 text-lg text-ink/75 leading-relaxed max-w-xl font-semibold scroll-reveal" style={{ transitionDelay: '120ms' }}>
              My background in logistics and field inspections shapes how I engineer
              software — with a focus on reliability under real-world conditions. I've
              delivered a fintech platform processing live
              transactions daily, and 3D industrial applications deployed on the floors
              at Tata Steel and JSW.
            </p>

            {/* stat badges like a game HUD */}
            <div className="mt-7 flex flex-wrap gap-3 scroll-reveal" style={{ transitionDelay: '160ms' }}>
              {stats.map((s) => (
                <div key={s.label} className="toon-pill bg-cream">
                  <span className="text-base">{s.icon}</span>
                  <span className="text-ink/50 uppercase">{s.label}</span>
                  <span className="text-ink">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4 scroll-reveal" style={{ transitionDelay: '200ms' }}>
              <a href="#projects" className="toon-btn">
                ▶ Start the tour
              </a>
              <a href="#contact" className="toon-btn toon-btn--ghost">
                Say hi 👋
              </a>
            </div>
          </div>

          {/* avatar as a "character select" card */}
          <div className="order-1 lg:order-2 flex justify-center scroll-reveal" style={{ transitionDelay: '80ms' }}>
            <div className="slab p-5 bg-sky/30 animate-toonbob relative">
              <Avatar size={210} />
              <span className="absolute -top-3 -left-3 toon-pill bg-sun rotate-[-8deg]">LVL 99</span>
              <div className="mt-3 text-center">
                <p className="font-display text-xl text-ink leading-none">Jainish</p>
                <p className="font-mono text-xs text-ink/55 mt-1">backend mage 🪄</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#projects"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink/50 hover:text-meadow-deep transition-colors scroll-reveal hover-wiggle"
        style={{ transitionDelay: '320ms' }}
        aria-label="Scroll to projects"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">scroll</span>
        <span className="w-6 h-9 rounded-full border-[3px] border-current flex justify-center pt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
        </span>
      </a>
    </section>
  );
};

export default HeroSection;
