import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedBlogsSection from '../components/FeaturedBlogsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HomePage = () => {
  useScrollReveal();
  
  return (
    <>
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