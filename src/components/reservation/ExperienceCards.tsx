import { EXPERIENCES } from '../../constants/experiences';
import type { ExperienceType } from '../../types/reservation';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceCardsProps {
  selected: ExperienceType | null;
  onSelect: (id: ExperienceType) => void;
}

export function ExperienceCards({ selected, onSelect }: ExperienceCardsProps) {
  return (
    <div className="reserve-dest-grid" role="list">
      {EXPERIENCES.map((experience, index) => (
        <div key={experience.id} role="listitem">
          <ExperienceCard
            experience={experience}
            selected={selected === experience.id}
            onSelect={() => onSelect(experience.id)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
