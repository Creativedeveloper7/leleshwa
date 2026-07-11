interface ExperienceGalleryProps {
  images: string[];
  name: string;
}

export function ExperienceGallery({ images, name }: ExperienceGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="acc-gallery">
      <h4 className="acc-detail-amenities-title">Gallery</h4>
      <div className="hscroll-wrap acc-gallery-scroll" tabIndex={0} aria-label={`${name} photo gallery`}>
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="acc-gallery-thumb"
            style={{ backgroundImage: `url('${src}')` }}
            role="img"
            aria-label={`${name} — photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
