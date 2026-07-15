import type { CuratedExperience } from '../../types/curatedExperience';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceGridProps {
  items: CuratedExperience[];
  onSelect: (id: string) => void;
}

export function ExperienceGrid({ items, onSelect }: ExperienceGridProps) {
  return (
    <div className="experience-grid" role="list">
      {items.map((experience) => (
        <div key={experience.id} role="listitem">
          <ExperienceCard experience={experience} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
