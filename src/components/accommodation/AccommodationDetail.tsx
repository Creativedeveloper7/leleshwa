import { Check, Users } from 'lucide-react';
import { getRelatedAccommodations } from '../../constants/accommodations';
import type { Accommodation } from '../../types/accommodation';
import { DetailGallery } from '../shared/DetailGallery';
import { RelatedAccommodations } from './RelatedAccommodations';

interface AccommodationDetailProps {
  accommodation: Accommodation;
  onBack: () => void;
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function AccommodationDetail({ accommodation, onBack, onSelect }: AccommodationDetailProps) {
  const related = getRelatedAccommodations(accommodation.id);

  return (
    <article className="acc-detail">
      <button type="button" className="acc-detail-back" onClick={onBack}>
        ← Back to accommodation
      </button>

      <div
        className="acc-detail-hero"
        style={{ backgroundImage: `url('${accommodation.heroImage}')` }}
        role="img"
        aria-label={accommodation.name}
      />

      <DetailGallery images={accommodation.gallery} name={accommodation.name} />

      <div className="acc-detail-body">
        <h3 className="acc-detail-title">{accommodation.name}</h3>
        <p className="acc-detail-tagline">{accommodation.tagline}</p>
        <p className="acc-detail-desc">{accommodation.description}</p>

        <div className="acc-detail-specs">
          <span className="acc-detail-spec">
            <Users size={16} strokeWidth={1.5} aria-hidden="true" />
            Up to {accommodation.maxGuests} guest{accommodation.maxGuests !== 1 ? 's' : ''}
          </span>
          <span className="acc-detail-spec">
            From {formatPrice(accommodation.priceFrom)} / night
          </span>
        </div>

        <div className="acc-detail-amenities">
          <h4 className="acc-detail-amenities-title">Amenities</h4>
          <ul className="acc-detail-amenities-list">
            {accommodation.amenities.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="btn-reserve acc-detail-cta" data-reserve-trigger>
          Reserve This Stay
        </button>
      </div>

      <RelatedAccommodations items={related} onSelect={onSelect} />
    </article>
  );
}
