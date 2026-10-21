import type { Accommodation } from '../../types/accommodation';
import { SectionCarousel } from '../shared/SectionCarousel';
import { AccommodationCard } from './AccommodationCard';

interface AccommodationGridProps {
  items: Accommodation[];
  onSelect: (id: string) => void;
}

export function AccommodationGrid({ items, onSelect }: AccommodationGridProps) {
  return (
    <SectionCarousel ariaLabel="Accommodation options" className="section-carousel--3up accommodation-grid-carousel">
      {items.map((accommodation) => (
        <AccommodationCard key={accommodation.id} accommodation={accommodation} onSelect={onSelect} />
      ))}
    </SectionCarousel>
  );
}
