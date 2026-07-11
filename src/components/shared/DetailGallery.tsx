import { HorizontalScroll } from '../shared/HorizontalScroll';

interface DetailGalleryProps {
  images: string[];
  name: string;
}

export function DetailGallery({ images, name }: DetailGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="acc-gallery">
      <h4 className="acc-detail-amenities-title">Gallery</h4>
      <HorizontalScroll
        className="acc-gallery-scroll"
        ariaLabel={`${name} photo gallery`}
        shellClassName="acc-gallery-carousel"
        showNav
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="acc-gallery-thumb"
            style={{ backgroundImage: `url('${src}')` }}
            role="img"
            aria-label={`${name} — photo ${index + 1}`}
          />
        ))}
      </HorizontalScroll>
    </div>
  );
}
