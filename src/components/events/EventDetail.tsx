import { Check, Clock, Users } from 'lucide-react';
import type { CuratedEvent } from '../../types/curatedEvent';
import { DetailGallery } from '../shared/DetailGallery';
import { RelatedEvents } from './RelatedEvents';

interface EventDetailProps {
  event: CuratedEvent;
  related: CuratedEvent[];
  onBack: () => void;
  onSelect: (id: string) => void;
}

function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function EventDetail({ event, related, onBack, onSelect }: EventDetailProps) {

  return (
    <article className="acc-detail events-detail">
      <button type="button" className="acc-detail-back events-detail-back" onClick={onBack}>
        ← Back to events
      </button>

      <div
        className="acc-detail-hero"
        style={{ backgroundImage: `url('${event.heroImage}')` }}
        role="img"
        aria-label={event.name}
      />

      <DetailGallery images={event.gallery} name={event.name} />

      <div className="acc-detail-body">
        <h3 className="acc-detail-title">{event.name}</h3>
        <p className="acc-detail-tagline">{event.tagline}</p>
        <p className="acc-detail-desc">{event.description}</p>

        <div className="acc-detail-specs">
          <span className="acc-detail-spec">
            <Clock size={16} strokeWidth={1.5} aria-hidden="true" />
            {event.duration}
          </span>
          <span className="acc-detail-spec">
            <Users size={16} strokeWidth={1.5} aria-hidden="true" />
            Up to {event.maxGuests} guests
          </span>
          <span className="acc-detail-spec">
            From {formatPrice(event.priceFrom)} {event.priceUnit}
          </span>
        </div>

        <div className="acc-detail-amenities">
          <h4 className="acc-detail-amenities-title">What's Included</h4>
          <ul className="acc-detail-amenities-list">
            {event.highlights.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="btn-reserve acc-detail-cta" data-reserve-trigger>
          Enquire About This Event
        </button>
      </div>

      <RelatedEvents items={related} onSelect={onSelect} />
    </article>
  );
}
