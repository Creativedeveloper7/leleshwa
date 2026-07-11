import type { Accommodation } from '../../types/accommodation';
import { RelatedCarousel } from '../shared/RelatedCarousel';

interface RelatedAccommodationsProps {
  items: Accommodation[];
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function RelatedAccommodations({ items, onSelect }: RelatedAccommodationsProps) {
  if (items.length === 0) return null;

  return (
    <RelatedCarousel headingId="acc-related-heading">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="feature-card feature-card-btn acc-related-card"
          data-accommodation-id={item.id}
          onClick={() => onSelect(item.id)}
          aria-label={`View ${item.name}`}
        >
          <div
            className="img"
            style={{ backgroundImage: `url('${item.heroImage}')` }}
            aria-hidden="true"
          />
          <h4>{item.name}</h4>
          <p>{item.tagline}</p>
          <span className="acc-related-price">From {formatPrice(item.priceFrom)} / night</span>
        </button>
      ))}
    </RelatedCarousel>
  );
}
