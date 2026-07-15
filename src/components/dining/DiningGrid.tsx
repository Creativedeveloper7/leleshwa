import type { DiningVenue } from '../../types/diningVenue';
import { DiningCard } from './DiningCard';

interface DiningGridProps {
  items: DiningVenue[];
  onSelect: (id: string) => void;
}

export function DiningGrid({ items, onSelect }: DiningGridProps) {
  return (
    <div className="dining-grid" role="list">
      {items.map((venue) => (
        <div key={venue.id} role="listitem">
          <DiningCard venue={venue} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
