import type { AboutStory } from '../../types/aboutStory';
import { SectionCarousel } from '../shared/SectionCarousel';
import { AboutCard } from './AboutCard';

interface AboutGridProps {
  items: AboutStory[];
  onSelect: (id: string) => void;
}

export function AboutGrid({ items, onSelect }: AboutGridProps) {
  return (
    <SectionCarousel ariaLabel="About Leleshwa stories" className="section-carousel--3up about-grid-carousel">
      {items.map((story) => (
        <AboutCard key={story.id} story={story} onSelect={onSelect} />
      ))}
    </SectionCarousel>
  );
}
