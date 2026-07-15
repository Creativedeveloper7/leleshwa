import { useCallback, useMemo, useRef, useState } from 'react';
import { GALLERY_FILTERS } from '../../constants/galleryPhotos';
import { useSiteContent } from '../../hooks/useSiteContent';
import type { GalleryFilterId } from '../../types/galleryPhoto';
import { GalleryFilterBar } from './GalleryFilterBar';
import { GalleryGrid } from './GalleryGrid';
import { GalleryLightbox } from './GalleryLightbox';

const FILTER_FADE_MS = 220;

export function GallerySection() {
  const { gallery } = useSiteContent();
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>('all');
  const [fading, setFading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'all') return gallery;
    return gallery.filter((photo) => photo.category === activeFilter);
  }, [activeFilter, gallery]);

  const handleFilterChange = useCallback((next: GalleryFilterId) => {
    if (next === activeFilter) return;

    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
    }

    setFading(true);
    fadeTimerRef.current = window.setTimeout(() => {
      setActiveFilter(next);
      setLightboxIndex(null);
      setFading(false);
      fadeTimerRef.current = null;
    }, FILTER_FADE_MS);
  }, [activeFilter]);

  const handleSelectPhoto = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <div className="gallery-root">
      <GalleryFilterBar
        active={activeFilter}
        filters={GALLERY_FILTERS}
        onChange={handleFilterChange}
      />

      <GalleryGrid
        photos={filteredPhotos}
        fading={fading}
        onSelect={handleSelectPhoto}
      />

      {lightboxIndex !== null && filteredPhotos.length > 0 && (
        <GalleryLightbox
          photos={filteredPhotos}
          index={lightboxIndex}
          onClose={handleCloseLightbox}
          onIndexChange={setLightboxIndex}
          triggerRef={triggerRef.current}
        />
      )}
    </div>
  );
}
