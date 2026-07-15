import type { AboutStory } from '../../types/aboutStory';
import { AboutCard } from './AboutCard';

interface AboutGridProps {
  items: AboutStory[];
  onSelect: (id: string) => void;
}

export function AboutGrid({ items, onSelect }: AboutGridProps) {
  return (
    <div className="about-grid" role="list">
      {items.map((story) => (
        <div key={story.id} role="listitem">
          <AboutCard story={story} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
