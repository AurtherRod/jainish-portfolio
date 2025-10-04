import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedBlogsSection from '../components/FeaturedBlogsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HomePage = () => {
  useScrollReveal();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jainish Gupta",
    "jobTitle": "Software Developer & CTO",
    "description": "Experienced Software Developer and CTO specializing in Node.js, MongoDB, and AWS. Building secure, scalable systems with 3+ years of experience.",
    "url": window.location.origin,
    "sameAs": [
      "https://www.linkedin.com/in/jainish-gupta/",
      "https://github.com/AurtherRod"
    ],
    "knowsAbout": [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Microservices",
      "AWS",
      "Docker",
      "DevOps",
      "System Architecture"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Software Development"
    }
  };
  
  return (
    <>
      <SEO 
        title="Jainish Gupta - Software Developer | Node.js & MongoDB Specialist"
        keywords={['Software Developer', 'Node.js Developer', 'MongoDB Expert', 'AWS', 'CTO', 'Microservices', 'REST APIs', 'System Architecture', 'DevOps', 'Full Stack Developer']}
      />
      <StructuredData data={structuredData} />
      <HeroSection />
      <FeaturedBlogsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default HomePage;