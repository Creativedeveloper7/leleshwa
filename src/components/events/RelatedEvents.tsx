import type { CuratedEvent } from '../../types/curatedEvent';
import { RelatedCarousel } from '../shared/RelatedCarousel';

interface RelatedEventsProps {
  items: CuratedEvent[];
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function RelatedEvents({ items, onSelect }: RelatedEventsProps) {
  if (items.length === 0) return null;

  return (
    <RelatedCarousel headingId="event-related-heading" scrollClassName="exp-related-scroll">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="exp-card exp-card-btn exp-related-card"
          data-event-id={item.id}
          style={{ backgroundImage: `url('${item.heroImage}')` }}
          onClick={() => onSelect(item.id)}
          aria-label={`View ${item.name}`}
        >
          <div className="exp-card-inner">
            <h4>{item.name}</h4>
            <p>{item.tagline}</p>
            <span className="acc-related-price">
              From {formatPrice(item.priceFrom)} {item.priceUnit}
            </span>
          </div>
        </button>
      ))}
    </RelatedCarousel>
  );
}
