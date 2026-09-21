import { Hero } from '@/components/hero/Hero';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { SelectedWorksSection } from '@/components/home/SelectedWorksSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ClientRosterSection } from '@/components/home/ClientRosterSection';
import { LetsTalkSection } from '@/components/home/LetsTalkSection';

export default function Home() {
  return (
    <main className="relative bg-surface w-full overflow-x-hidden">
      <Hero />
      <ManifestoSection />
      <SelectedWorksSection />
      <ServicesSection />
      <ClientRosterSection />
      <LetsTalkSection />
    </main>
  );
}
