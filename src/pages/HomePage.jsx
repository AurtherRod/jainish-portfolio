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
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jainish.space/#person",
        "name": "Jainish Gupta",
        "givenName": "Jainish",
        "familyName": "Gupta",
        "jobTitle": ["Chief Technology Officer", "Software Developer", "Backend Architect"],
        "description": "CTO and Co-founder at Trustopay with 3+ years of experience building secure, scalable fintech systems using Node.js, MongoDB, and AWS.",
        "url": "https://jainish.space/",
        "image": "https://jainish.space/Images/favicon.png",
        "sameAs": [
          "https://www.linkedin.com/in/jainish-gupta/",
          "https://github.com/AurtherRod"
        ],
        "knowsAbout": [
          "Node.js", "Express.js", "MongoDB", "REST APIs", "Microservices", 
          "AWS", "Docker", "System Architecture", "Fintech", "Backend Development"
        ],
        "worksFor": {
          "@type": "Organization",
          "@id": "https://jainish.space/#trustopay",
          "name": "Trustopay Innovations Pvt. Ltd."
        }
      },
      {
        "@type": "Organization",
        "@id": "https://jainish.space/#trustopay",
        "name": "Trustopay Innovations Pvt. Ltd.",
        "description": "India's secure escrow platform for online transactions, processing 1000+ daily transactions with 99.9% uptime.",
        "url": "https://trustopay.in",
        "founder": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        },
        "industry": "Fintech",
        "numberOfEmployees": "10-50"
      },
      {
        "@type": "WebSite",
        "@id": "https://jainish.space/#website",
        "url": "https://jainish.space/",
        "name": "Jainish Gupta - Software Developer Portfolio",
        "description": "Portfolio showcasing Node.js, MongoDB, and AWS projects by CTO Jainish Gupta",
        "publisher": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ProfilePage",
        "@id": "https://jainish.space/#profilepage",
        "url": "https://jainish.space/",
        "name": "Jainish Gupta - CTO & Node.js Developer",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://jainish.space/#website"
        },
        "about": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        },
        "mainEntity": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        }
      }
    ]
  };
  
  return (
    <>
      <SEO 
        title="Jainish Gupta - CTO & Node.js Developer | Fintech Backend Specialist"
        description="CTO at Trustopay | Node.js & MongoDB specialist building secure fintech systems. 3+ years architecting scalable backends processing 1000+ daily transactions."
        keywords={['Node.js developer', 'MongoDB specialist', 'CTO', 'fintech developer', 'backend architect', 'microservices expert', 'REST APIs', 'AWS developer', 'Docker', 'system design']}
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