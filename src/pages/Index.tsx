import { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Uses from '@/components/Uses';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ParticleBackground from '@/components/ParticleBackground';
import ChessPlaying from '@/components/ChessPlaying';
import RecentFavorite from '@/components/RecentFavorite';

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth scrolling behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Uses />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Index;
