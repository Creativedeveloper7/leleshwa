import type { AboutStory } from '../../types/aboutStory';
import { RelatedCarousel } from '../shared/RelatedCarousel';

interface RelatedAboutStoriesProps {
  items: AboutStory[];
  onSelect: (id: string) => void;
}

export function RelatedAboutStories({ items, onSelect }: RelatedAboutStoriesProps) {
  if (items.length === 0) return null;

  return (
    <RelatedCarousel headingId="about-related-heading" title="Continue Reading">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="feature-card feature-card-btn acc-related-card"
          data-about-id={item.id}
          onClick={() => onSelect(item.id)}
          aria-label={`Read about ${item.name}`}
        >
          <div
            className="img"
            style={{ backgroundImage: `url('${item.heroImage}')` }}
            aria-hidden="true"
          />
          <h4>{item.name}</h4>
          <p>{item.tagline}</p>
        </button>
      ))}
    </RelatedCarousel>
  );
}
