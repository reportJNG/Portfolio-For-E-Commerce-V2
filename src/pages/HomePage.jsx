import React from 'react';
import Hero from '../components/sections/Hero';
import MetricsBar from '../components/sections/MetricsBar';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import CaseStudies from '../components/sections/CaseStudies';
import Testimonials from '../components/sections/Testimonials';
import BlogPreview from '../components/sections/BlogPreview';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MetricsBar />
      <About />
      <Services />
      <CaseStudies />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </main>
  );
}
