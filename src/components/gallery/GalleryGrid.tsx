import type { GalleryPhoto } from '../../types/galleryPhoto';
import { SectionCarousel } from '../shared/SectionCarousel';

interface GalleryGridProps {
  photos: GalleryPhoto[];
  fading: boolean;
  onSelect: (index: number, trigger: HTMLButtonElement) => void;
}

export function GalleryGrid({ photos, fading, onSelect }: GalleryGridProps) {
  if (photos.length === 0) {
    return (
      <p className="gallery-empty reserve-ledger__empty" role="status">
        No images in this category yet — check back soon.
      </p>
    );
  }

  return (
    <div
      className={`gallery-grid-wrap${fading ? ' gallery-grid-wrap--fading' : ''}`}
      aria-live="polite"
    >
      <SectionCarousel
        key={`${photos.length}-${photos[0].id}`}
        ariaLabel="Photo gallery"
        className="section-carousel--4up gallery-carousel"
        tone="dark"
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className="gallery-masonry__item gallery-carousel__item"
            onClick={(event) => onSelect(index, event.currentTarget)}
            aria-label={`View ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
          </button>
        ))}
      </SectionCarousel>
    </div>
  );
}
