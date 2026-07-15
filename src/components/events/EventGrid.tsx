import type { CuratedEvent } from '../../types/curatedEvent';
import { EventCard } from './EventCard';

interface EventGridProps {
  items: CuratedEvent[];
  onSelect: (id: string) => void;
}

export function EventGrid({ items, onSelect }: EventGridProps) {
  return (
    <div className="experience-grid event-grid" role="list">
      {items.map((event) => (
        <div key={event.id} role="listitem">
          <EventCard event={event} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
