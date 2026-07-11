import type { DiningVenue } from '../../types/diningVenue';

interface DiningCardProps {
  venue: DiningVenue;
  onSelect: (id: string) => void;
}

export function DiningCard({ venue, onSelect }: DiningCardProps) {
  return (
    <button
      type="button"
      className="feature-card feature-card-btn"
      data-dining-id={venue.id}
      onClick={() => onSelect(venue.id)}
      aria-label={`View ${venue.name}`}
    >
      <div
        className="img"
        style={{ backgroundImage: `url('${venue.heroImage}')` }}
        aria-hidden="true"
      />
      <h4>{venue.name}</h4>
      <p>{venue.tagline}</p>
    </button>
  );
}
