import { CURATED_EVENTS } from '../../constants/curatedEvents';
import { EventCard } from './EventCard';

interface EventGridProps {
  onSelect: (id: string) => void;
}

export function EventGrid({ onSelect }: EventGridProps) {
  return (
    <div className="experience-grid event-grid" role="list">
      {CURATED_EVENTS.map((event) => (
        <div key={event.id} role="listitem">
          <EventCard event={event} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
