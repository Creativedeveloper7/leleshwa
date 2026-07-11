import type { CuratedExperience } from '../../types/curatedExperience';

interface ExperienceCardProps {
  experience: CuratedExperience;
  onSelect: (id: string) => void;
}

export function ExperienceCard({ experience, onSelect }: ExperienceCardProps) {
  return (
    <button
      type="button"
      className="exp-card exp-card-btn"
      data-experience-id={experience.id}
      style={{ backgroundImage: `url('${experience.heroImage}')` }}
      onClick={() => onSelect(experience.id)}
      aria-label={`View details for ${experience.name}`}
    >
      <div className="exp-card-inner">
        <h4>{experience.name}</h4>
        <p>{experience.tagline}</p>
      </div>
    </button>
  );
}
