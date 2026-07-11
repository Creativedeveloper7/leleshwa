import type { CuratedExperience } from '../../types/curatedExperience';
import { RelatedCarousel } from '../shared/RelatedCarousel';

interface RelatedExperiencesProps {
  items: CuratedExperience[];
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function RelatedExperiences({ items, onSelect }: RelatedExperiencesProps) {
  if (items.length === 0) return null;

  return (
    <RelatedCarousel headingId="exp-related-heading" scrollClassName="exp-related-scroll">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="exp-card exp-card-btn exp-related-card"
          data-experience-id={item.id}
          style={{ backgroundImage: `url('${item.heroImage}')` }}
          onClick={() => onSelect(item.id)}
          aria-label={`View ${item.name}`}
        >
          <div className="exp-card-inner">
            <h4>{item.name}</h4>
            <p>{item.tagline}</p>
            <span className="acc-related-price">From {formatPrice(item.priceFrom)} / person</span>
          </div>
        </button>
      ))}
    </RelatedCarousel>
  );
}
