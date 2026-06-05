import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedBlogsSection from '../components/FeaturedBlogsSection';
import ProjectsSection from '../components/ProjectsSection';
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
        "jobTitle": ["Software Engineer", "Full-Stack Developer", "Backend Engineer"],
        "description": "Software Engineer with 3+ years building scalable web applications, backend systems, and full-stack solutions. Expert in Node.js, React, MongoDB, and cloud technologies.",
        "url": "https://jainish.space/",
        "image": "https://jainish.space/Images/favicon.png",
        "sameAs": [
          "https://www.linkedin.com/in/jainish-gupta/",
          "https://github.com/AurtherRod"
        ],
        "knowsAbout": [
          "JavaScript", "TypeScript", "Node.js", "React", "MongoDB", "PostgreSQL",
          "System Design", "REST APIs", "Docker", "AWS", "Performance Optimization"
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
        "name": "Coincade Studio",
        "description": "Technology company specializing in software development and scalable web solutions.",
        "url": "https://jainish.space/",
        "founder": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        },
        "industry": "Software Development",
        "numberOfEmployees": "10-50"
      },
      {
        "@type": "WebSite",
        "@id": "https://jainish.space/#website",
        "url": "https://jainish.space/",
        "name": "Jainish Gupta - Software Engineer Portfolio",
        "description": "Portfolio showcasing software engineering projects and technical expertise by Jainish Gupta",
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
        "name": "Jainish Gupta - Software Engineer",
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
        title="Jainish Gupta - Software Engineer | Full-Stack Developer"
        description="Software Engineer building scalable web applications and backend systems. 3+ years of experience with Node.js, React, MongoDB, and cloud technologies."
        keywords={['software engineer', 'full-stack developer', 'backend engineer', 'Node.js developer', 'React developer', 'web developer', 'system design', 'MongoDB', 'JavaScript', 'TypeScript']}
      />
      <StructuredData data={structuredData} />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <FeaturedBlogsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;