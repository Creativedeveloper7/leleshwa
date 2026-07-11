import type { Accommodation } from '../../types/accommodation';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onSelect: (id: string) => void;
}

export function AccommodationCard({ accommodation, onSelect }: AccommodationCardProps) {
  return (
    <button
      type="button"
      className="feature-card feature-card-btn"
      data-accommodation-id={accommodation.id}
      onClick={() => onSelect(accommodation.id)}
      aria-label={`View details for ${accommodation.name}`}
    >
      <div
        className="img"
        style={{ backgroundImage: `url('${accommodation.heroImage}')` }}
        aria-hidden="true"
      />
      <h4>{accommodation.name}</h4>
      <p>{accommodation.tagline}</p>
    </button>
  );
}
