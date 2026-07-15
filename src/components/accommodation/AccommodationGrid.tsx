import type { Accommodation } from '../../types/accommodation';
import { AccommodationCard } from './AccommodationCard';

interface AccommodationGridProps {
  items: Accommodation[];
  onSelect: (id: string) => void;
}

export function AccommodationGrid({ items, onSelect }: AccommodationGridProps) {
  return (
    <div className="accommodation-grid" role="list">
      {items.map((accommodation) => (
        <div key={accommodation.id} role="listitem">
          <AccommodationCard accommodation={accommodation} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
