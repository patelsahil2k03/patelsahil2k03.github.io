import type { Metadata } from 'next';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Hero } from '@/components/home/Hero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ResearchSection } from '@/components/home/ResearchSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { SkillsSection } from '@/components/home/SkillsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { NotesSection } from '@/components/home/NotesSection';
import { ContactSection } from '@/components/home/ContactSection';

export const metadata: Metadata = { alternates: { canonical: '/' } };

// The 3D avatar companion (src/components/avatar/) is hidden (AVATAR_ENABLED = false) and deliberately NOT imported here:
// Next.js bundles any dynamic() import a page contains, so even an unrendered one shipped 668 kB of three.js on every visit.
// To restore it (finding U-02): set AVATAR_ENABLED, then add back
//   const AvatarCompanion = dynamic(() => import('@/components/avatar/AvatarCompanion').then((m) => m.AvatarCompanion), { ssr: false });
// and render <AvatarCompanion /> after <Footer />. ssr: false is required: react-three-fiber touches WebGL globals.

// Reading order (docs/design/DESIGN_DIRECTION.md §4, revised after the 2026-11-23 reviews): claim, proof, record,
// research, builds, skills, person, sources, contact: the evidence closes the argument and the page ends on the ask.
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <SelectedWork />
        <ExperienceSection />
        <ResearchSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <NotesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
