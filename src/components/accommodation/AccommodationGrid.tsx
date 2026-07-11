import { ACCOMMODATIONS } from '../../constants/accommodations';
import { AccommodationCard } from './AccommodationCard';

interface AccommodationGridProps {
  onSelect: (id: string) => void;
}

export function AccommodationGrid({ onSelect }: AccommodationGridProps) {
  return (
    <div className="accommodation-grid" role="list">
      {ACCOMMODATIONS.map((accommodation) => (
        <div key={accommodation.id} role="listitem">
          <AccommodationCard accommodation={accommodation} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
