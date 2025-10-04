import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32 border-t-2 border-yellow-400/20 bg-gradient-to-b from-transparent to-yellow-900/10">
      <div className="container mx-auto px-6 text-center scroll-reveal">
        <div className="inline-block bg-yellow-500/10 px-4 py-1 rounded-full mb-4">
          <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">Let's Connect</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="neon-accent">Touch</span></h2>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed mb-8">I'm always open to discussing software development opportunities, technical consulting, or joining ambitious teams building scalable systems.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="mailto:jainishgupta2000@gmail.com" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-transform transform hover:scale-105 hover:shadow-lg neon-shadow"
            aria-label="Send email to Jainish Gupta"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Say Hello
          </a>
          
          <a 
            href="/resume.pdf" 
            download="Jainish_Gupta_Backend_Developer_Resume.pdf"
            className="inline-flex items-center border-2 border-blue-400 text-blue-400 font-bold px-8 py-4 rounded-full uppercase tracking-wider hover:bg-blue-400 hover:text-gray-900 transition-all transform hover:scale-105"
            aria-label="Download Resume"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;