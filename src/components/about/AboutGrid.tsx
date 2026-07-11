import { ABOUT_STORIES } from '../../constants/aboutStories';
import { AboutCard } from './AboutCard';

interface AboutGridProps {
  onSelect: (id: string) => void;
}

export function AboutGrid({ onSelect }: AboutGridProps) {
  return (
    <div className="about-grid" role="list">
      {ABOUT_STORIES.map((story) => (
        <div key={story.id} role="listitem">
          <AboutCard story={story} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
