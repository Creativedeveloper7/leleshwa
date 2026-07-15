import { Check } from 'lucide-react';
import type { AboutStory } from '../../types/aboutStory';
import { DetailGallery } from '../shared/DetailGallery';
import { RelatedAboutStories } from './RelatedAboutStories';

interface AboutDetailProps {
  story: AboutStory;
  related: AboutStory[];
  onBack: () => void;
  onSelect: (id: string) => void;
}

export function AboutDetail({ story, related, onBack, onSelect }: AboutDetailProps) {

  return (
    <article className="acc-detail">
      <button type="button" className="acc-detail-back" onClick={onBack}>
        ← Back to about
      </button>

      <div
        className="acc-detail-hero"
        style={{ backgroundImage: `url('${story.heroImage}')` }}
        role="img"
        aria-label={story.name}
      />

      <DetailGallery images={story.gallery} name={story.name} />

      <div className="acc-detail-body">
        <h3 className="acc-detail-title">{story.name}</h3>
        <p className="acc-detail-tagline">{story.tagline}</p>
        <p className="acc-detail-desc">{story.description}</p>

        <div className="acc-detail-amenities">
          <h4 className="acc-detail-amenities-title">At a Glance</h4>
          <ul className="acc-detail-amenities-list">
            {story.highlights.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="acc-detail-desc" style={{ fontStyle: 'italic', marginTop: '8px' }}>
          &ldquo;Where every sunset tells a story, and every stay becomes a memory.&rdquo;
        </blockquote>

        <button type="button" className="btn-reserve acc-detail-cta" data-reserve-trigger>
          Plan Your Visit
        </button>
      </div>

      <RelatedAboutStories items={related} onSelect={onSelect} />
    </article>
  );
}
