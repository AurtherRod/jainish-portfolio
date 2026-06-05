import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-36 relative">
      <div className="container mx-auto px-6">
        <div className="slab p-8 md:p-14 max-w-4xl mx-auto text-center bg-sun/15 scroll-reveal relative overflow-hidden">
          <span className="toon-pill bg-coral text-white mb-5"><span>✉️</span> New Game+</span>
          <h2 className="font-display text-4xl md:text-6xl text-ink mt-3 mb-5">
            Ready Player Two?
          </h2>
          <p className="text-ink/75 text-lg leading-relaxed mb-9 max-w-xl mx-auto font-semibold">
            Open to full-time roles, contract work, or just teaming up on a stubborn
            backend boss fight. Email's the surest way to reach me — I usually reply
            within a day.
          </p>

          <a href="mailto:jainishgupta2000@gmail.com" className="toon-btn text-sm md:text-lg py-3 px-5 md:py-3.5 md:px-8 max-w-full">
            <span className="truncate">✉️ jainishgupta2000@gmail.com</span>
          </a>

          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="toon-btn toon-btn--ghost text-sm py-2 px-4">
              LinkedIn ↗
            </a>
            <a href="https://github.com/AurtherRod" target="_blank" rel="noreferrer" className="toon-btn toon-btn--ghost text-sm py-2 px-4">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
