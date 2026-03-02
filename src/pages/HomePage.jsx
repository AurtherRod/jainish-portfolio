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
        "jobTitle": ["Unity Game Developer", "C# Gameplay Programmer", "Technical Game Designer"],
        "description": "Unity Game Developer with 3+ years creating immersive gaming experiences. Expert in C#, gameplay mechanics, vehicle physics, procedural generation, and custom Unity tools. Games with 300K+ downloads.",
        "url": "https://jainish.space/",
        "image": "https://jainish.space/Images/favicon.png",
        "sameAs": [
          "https://www.linkedin.com/in/jainish-gupta/",
          "https://github.com/AurtherRod",
          "https://twitter.com/jainishgupta",
          "https://www.facebook.com/jainish.gupta",
          "https://www.instagram.com/jainish.gupta"
        ],
        "knowsAbout": [
          "Unity", "C#", "Game Development", "Game Physics", "Gameplay Programming", 
          "Shader Programming", "AI & Pathfinding", "Level Design", "Custom Unity Tools", "Performance Optimization"
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
        "description": "Game development studio specializing in blockchain gaming and innovative gameplay mechanics.",
        "url": "https://jainish.space/",
        "founder": {
          "@type": "Person",
          "@id": "https://jainish.space/#person"
        },
        "industry": "Game Development",
        "numberOfEmployees": "10-50"
      },
      {
        "@type": "WebSite",
        "@id": "https://jainish.space/#website",
        "url": "https://jainish.space/",
        "name": "Jainish Gupta - Game Developer Portfolio",
        "description": "Portfolio showcasing Unity games and C# projects by Game Developer Jainish Gupta",
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
        "name": "Jainish Gupta - Unity Game Developer",
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
        title="Jainish Gupta - Unity Game Developer | C# Specialist"
        description="Unity Game Developer creating immersive gaming experiences with C#. 3+ years building 2D/3D games, custom tools, and advanced gameplay mechanics."
        keywords={['Unity developer', 'C# game programmer', 'game developer', 'Unity specialist', 'gameplay programmer', 'technical game designer', '2D games', '3D games', 'game physics', 'Unity tools']}
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