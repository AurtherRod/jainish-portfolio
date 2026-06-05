import React from 'react';

const skills = [
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'React', icon: '⚛️' },
  { name: 'Unity / C#', icon: '🎮' },
  { name: 'REST APIs', icon: '🔌' },
  { name: 'CI/CD', icon: '🚀' },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="mb-12 scroll-reveal">
          <span className="toon-pill bg-sky"><span>📖</span> Backstory</span>
          <h2 className="font-display text-5xl md:text-6xl text-ink mt-3">About the player</h2>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          {/* story card */}
          <div className="slab p-7 md:p-9 scroll-reveal">
            <div className="space-y-5 text-ink/80 text-lg leading-relaxed font-semibold">
              <p>
                That background on the factory floor isn't a footnote — it's how I think.
                Field inspections taught me that the only thing that matters is whether a
                system holds up when something goes wrong at 2am, not how clean it looks in
                a demo.
              </p>
              <p>
                So I build for the failure cases. Most of my work lives at the seam between a
                reliable database and an interface someone has to use under pressure — a
                Node.js service on AWS feeding a Unity 3D front-end. The fintech platform
                that got picked into the top 1% by WTFund, the industrial tools at Tata Steel
                and JSW — all of it came from the same instinct: <span className="marker">make the boring parts bulletproof.</span>
              </p>
            </div>
          </div>

          {/* skill inventory */}
          <div className="slab p-7 bg-meadow/10 scroll-reveal" style={{ transitionDelay: '120ms' }}>
            <h3 className="font-display text-2xl text-ink mb-4 flex items-center gap-2">
              <span>🎒</span> Inventory
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <span key={s.name} className="toon-pill bg-cream hover-wiggle">
                  <span className="text-sm">{s.icon}</span> {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
