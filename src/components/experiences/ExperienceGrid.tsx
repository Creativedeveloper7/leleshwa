import { CURATED_EXPERIENCES } from '../../constants/curatedExperiences';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceGridProps {
  onSelect: (id: string) => void;
}

export function ExperienceGrid({ onSelect }: ExperienceGridProps) {
  return (
    <div className="experience-grid" role="list">
      {CURATED_EXPERIENCES.map((experience) => (
        <div key={experience.id} role="listitem">
          <ExperienceCard experience={experience} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
