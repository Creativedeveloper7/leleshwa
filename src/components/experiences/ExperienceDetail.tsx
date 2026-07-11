import { Check, Clock, Users } from 'lucide-react';
import { getRelatedExperiences } from '../../constants/curatedExperiences';
import type { CuratedExperience } from '../../types/curatedExperience';
import { DetailGallery } from '../shared/DetailGallery';
import { RelatedExperiences } from './RelatedExperiences';

interface ExperienceDetailProps {
  experience: CuratedExperience;
  onBack: () => void;
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function ExperienceDetail({ experience, onBack, onSelect }: ExperienceDetailProps) {
  const related = getRelatedExperiences(experience.id);

  return (
    <article className="acc-detail">
      <button type="button" className="acc-detail-back" onClick={onBack}>
        ← Back to experiences
      </button>

      <div
        className="acc-detail-hero"
        style={{ backgroundImage: `url('${experience.heroImage}')` }}
        role="img"
        aria-label={experience.name}
      />

      <DetailGallery images={experience.gallery} name={experience.name} />

      <div className="acc-detail-body">
        <h3 className="acc-detail-title">{experience.name}</h3>
        <p className="acc-detail-tagline">{experience.tagline}</p>
        <p className="acc-detail-desc">{experience.description}</p>

        <div className="acc-detail-specs">
          <span className="acc-detail-spec">
            <Clock size={16} strokeWidth={1.5} aria-hidden="true" />
            {experience.duration}
          </span>
          <span className="acc-detail-spec">
            <Users size={16} strokeWidth={1.5} aria-hidden="true" />
            Up to {experience.maxGuests} guests
          </span>
          <span className="acc-detail-spec">
            From {formatPrice(experience.priceFrom)} / person
          </span>
        </div>

        <div className="acc-detail-amenities">
          <h4 className="acc-detail-amenities-title">Highlights</h4>
          <ul className="acc-detail-amenities-list">
            {experience.highlights.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="btn-reserve acc-detail-cta" data-reserve-trigger>
          Book This Experience
        </button>
      </div>

      <RelatedExperiences items={related} onSelect={onSelect} />
    </article>
  );
}
