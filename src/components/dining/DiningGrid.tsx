import { DINING_VENUES } from '../../constants/diningVenues';
import { DiningCard } from './DiningCard';

interface DiningGridProps {
  onSelect: (id: string) => void;
}

export function DiningGrid({ onSelect }: DiningGridProps) {
  return (
    <div className="dining-grid" role="list">
      {DINING_VENUES.map((venue) => (
        <div key={venue.id} role="listitem">
          <DiningCard venue={venue} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
