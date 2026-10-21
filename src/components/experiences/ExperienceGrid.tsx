import type { CuratedExperience } from '../../types/curatedExperience';
import { SectionCarousel } from '../shared/SectionCarousel';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceGridProps {
  items: CuratedExperience[];
  onSelect: (id: string) => void;
}

export function ExperienceGrid({ items, onSelect }: ExperienceGridProps) {
  return (
    <SectionCarousel ariaLabel="Curated experiences" className="section-carousel--3up experience-grid-carousel">
      {items.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} onSelect={onSelect} />
      ))}
    </SectionCarousel>
  );
}
