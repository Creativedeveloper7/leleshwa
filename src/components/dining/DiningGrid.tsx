import type { DiningVenue } from '../../types/diningVenue';
import { SectionCarousel } from '../shared/SectionCarousel';
import { DiningCard } from './DiningCard';

interface DiningGridProps {
  items: DiningVenue[];
  onSelect: (id: string) => void;
}

export function DiningGrid({ items, onSelect }: DiningGridProps) {
  return (
    <SectionCarousel ariaLabel="Dining venues" className="section-carousel--3up dining-grid-carousel">
      {items.map((venue) => (
        <DiningCard key={venue.id} venue={venue} onSelect={onSelect} />
      ))}
    </SectionCarousel>
  );
}
