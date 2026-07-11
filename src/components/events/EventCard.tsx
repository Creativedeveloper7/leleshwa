import type { CuratedEvent } from '../../types/curatedEvent';

interface EventCardProps {
  event: CuratedEvent;
  onSelect: (id: string) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <button
      type="button"
      className="exp-card exp-card-btn"
      data-event-id={event.id}
      style={{ backgroundImage: `url('${event.heroImage}')` }}
      onClick={() => onSelect(event.id)}
      aria-label={`View details for ${event.name}`}
    >
      <div className="exp-card-inner">
        <h4>{event.name}</h4>
        <p>{event.tagline}</p>
      </div>
    </button>
  );
}
