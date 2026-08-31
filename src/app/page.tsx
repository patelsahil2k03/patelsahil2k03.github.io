import dynamic from 'next/dynamic';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { HeroEnhanced as Hero } from '@/components/sections/HeroEnhanced';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Publications } from '@/components/sections/Publications';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';

// ssr: false is required, not optional — AvatarCompanion pulls in a
// react-three-fiber Canvas that touches WebGL/DOM globals which don't exist
// during Next.js's static-export prerender pass. A plain import breaks the
// build. Loading it dynamically also keeps the 3D bundle out of the initial
// payload, so it never blocks the core content.
const AvatarCompanion = dynamic(
  () => import('@/components/avatar/AvatarCompanion').then((m) => m.AvatarCompanion),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <CaseStudies />
        <Skills />
        <Projects />
        <Publications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <AvatarCompanion />
    </>
  );
}
