import type { AboutStory } from '../../types/aboutStory';

interface AboutCardProps {
  story: AboutStory;
  onSelect: (id: string) => void;
}

export function AboutCard({ story, onSelect }: AboutCardProps) {
  return (
    <button
      type="button"
      className="feature-card feature-card-btn"
      data-about-id={story.id}
      onClick={() => onSelect(story.id)}
      aria-label={`Read about ${story.name}`}
    >
      <div
        className="img"
        style={{ backgroundImage: `url('${story.heroImage}')` }}
        aria-hidden="true"
      />
      <h4>{story.name}</h4>
      <p>{story.tagline}</p>
    </button>
  );
}
