import { useCallback, useEffect, useState } from 'react';
import { getAboutStoryById } from '../../constants/aboutStories';
import { OPEN_ABOUT_EVENT } from '../../utils/aboutEvents';
import { AboutDetail } from './AboutDetail';
import { AboutGrid } from './AboutGrid';

export function AboutSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getAboutStoryById(selectedId) : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && getAboutStoryById(id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_ABOUT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ABOUT_EVENT, onOpen);
  }, [handleSelect]);

  return (
    <div className="about-root">
      {selected ? (
        <AboutDetail story={selected} onBack={handleBack} onSelect={handleSelect} />
      ) : (
        <AboutGrid onSelect={handleSelect} />
      )}
    </div>
  );
}
