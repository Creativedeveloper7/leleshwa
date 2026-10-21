import type { CuratedEvent } from '../../types/curatedEvent';
import { SectionCarousel } from '../shared/SectionCarousel';
import { EventCard } from './EventCard';

interface EventGridProps {
  items: CuratedEvent[];
  onSelect: (id: string) => void;
}

export function EventGrid({ items, onSelect }: EventGridProps) {
  return (
    <SectionCarousel ariaLabel="Curated events" className="section-carousel--3up experience-grid-carousel">
      {items.map((event) => (
        <EventCard key={event.id} event={event} onSelect={onSelect} />
      ))}
    </SectionCarousel>
  );
}
