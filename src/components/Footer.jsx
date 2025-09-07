import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.linkedin.com/in/jainish-gupta/" className="hover:text-green-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/jainish-username" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">GitHub</a>
        </div>
        <p>&copy; 2025 Jainish Gupta. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;