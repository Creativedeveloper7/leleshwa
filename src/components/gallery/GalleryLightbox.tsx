import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import type { GalleryPhoto } from '../../types/galleryPhoto';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  triggerRef: HTMLButtonElement | null;
}

const SWIPE_THRESHOLD = 50;

export function GalleryLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  triggerRef,
}: GalleryLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;
  const current = total > 0 ? index : 0;
  const photo = photos[current];

  useFocusTrap(overlayRef, true);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, onIndexChange, total]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, onIndexChange, total]);

  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => triggerRef?.focus());
  }, [onClose, triggerRef]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, handleClose]);

  useEffect(() => {
    stageRef.current?.focus();
  }, [current]);

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

  if (!photo) return null;

  return (
    <div
      ref={overlayRef}
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="gallery-lightbox__panel">
        <button
          type="button"
          className="concierge-close gallery-lightbox__close"
          onClick={handleClose}
          aria-label="Close gallery viewer"
        >
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <div
          ref={stageRef}
          className="menu-slideshow__stage gallery-lightbox__stage"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={photo.alt}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="menu-slideshow__image gallery-lightbox__image"
            draggable={false}
          />

          <button
            type="button"
            className="menu-slideshow__arrow menu-slideshow__arrow--prev concierge-btn-ghost"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="menu-slideshow__arrow menu-slideshow__arrow--next concierge-btn-ghost"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="menu-slideshow__meta gallery-lightbox__meta">
          <p className="gallery-lightbox__caption">{photo.alt}</p>
          <span className="reserve-ledger-meta__step" aria-live="polite">
            {current + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
