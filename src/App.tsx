import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1e3a8a] to-[#0f172a] text-slate-50 relative overflow-x-hidden">
      <ScrollProgress progress={scrollProgress} />
      <AnimatedBackground />
      
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-24">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Education />
        </div>
        <Footer />
      </main>
    </div>
  );
}
