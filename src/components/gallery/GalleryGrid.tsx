import { GALLERY_MASONRY_HEIGHTS } from '../../constants/galleryPhotos';
import type { GalleryPhoto } from '../../types/galleryPhoto';

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
      className={`gallery-grid-wrap masonry gallery-masonry${fading ? ' gallery-grid-wrap--fading' : ''}`}
      role="list"
      aria-live="polite"
    >
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          role="listitem"
          className="gallery-masonry__item m-item"
          style={{ height: GALLERY_MASONRY_HEIGHTS[index % GALLERY_MASONRY_HEIGHTS.length] }}
          onClick={(event) => onSelect(index, event.currentTarget)}
          aria-label={`View ${photo.alt}`}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
        </button>
      ))}
    </div>
  );
}
