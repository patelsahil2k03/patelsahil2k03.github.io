import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Publications } from '@/components/sections/Publications';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Publications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}