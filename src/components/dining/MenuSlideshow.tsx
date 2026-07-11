import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MenuSlideshowProps {
  title: string;
  images: string[];
  onBack: () => void;
}

const SWIPE_THRESHOLD = 50;

export function MenuSlideshow({ title, images, onBack }: MenuSlideshowProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const current = total > 0 ? index % total : 0;

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    regionRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    const node = regionRef.current;
    node?.addEventListener('keydown', onKey);
    return () => node?.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (total === 0) {
    return (
      <article className="acc-detail">
        <button type="button" className="acc-detail-back" onClick={onBack}>
          ← Back to dining
        </button>
        <p className="acc-detail-desc">Menu pages are not available yet.</p>
      </article>
    );
  }

  return (
    <article className="acc-detail menu-slideshow">
      <button type="button" className="acc-detail-back" onClick={onBack}>
        ← Back to dining
      </button>

      <h3 className="acc-detail-title">{title}</h3>
      <p className="acc-detail-tagline">Menu</p>

      <div
        ref={regionRef}
        className="menu-slideshow__stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} menu viewer`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          alt={`${title} menu page ${current + 1} of ${total}`}
          className="menu-slideshow__image"
          draggable={false}
        />

        <button
          type="button"
          className="menu-slideshow__arrow menu-slideshow__arrow--prev concierge-btn-ghost"
          onClick={goPrev}
          aria-label="Previous menu page"
        >
          <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="menu-slideshow__arrow menu-slideshow__arrow--next concierge-btn-ghost"
          onClick={goNext}
          aria-label="Next menu page"
        >
          <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="menu-slideshow__meta">
        <span className="reserve-ledger-meta__step" aria-live="polite">
          {current + 1} / {total}
        </span>
        <div className="menu-slideshow__dots" role="tablist" aria-label="Menu page indicators">
          {images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              role="tab"
              aria-selected={dotIndex === current}
              aria-label={`Go to menu page ${dotIndex + 1}`}
              className={`menu-slideshow__dot${dotIndex === current ? ' menu-slideshow__dot--active' : ''}`}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
