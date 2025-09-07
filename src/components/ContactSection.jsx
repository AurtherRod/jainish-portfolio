import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center scroll-reveal">
        <h2 className="text-4xl md:text-5xl font-bold">Get In <span className="neon-accent">Touch</span></h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team. Feel free to reach out.</p>
        <a href="mailto:jainishgupta2000@gmail.com" className="mt-8 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-transform transform hover:scale-105 hover:shadow-lg neon-shadow">
          Say Hello
        </a>
      </div>
    </section>
  );
};

export default ContactSection;