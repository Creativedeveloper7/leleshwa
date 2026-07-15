import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OPEN_ABOUT_EVENT } from '../../utils/aboutEvents';
import { AboutDetail } from './AboutDetail';
import { AboutGrid } from './AboutGrid';

export function AboutSection() {
  const { about } = useSiteContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? about.find((item) => item.id === selectedId) ?? null
    : null;

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
      if (id && about.some((item) => item.id === id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_ABOUT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ABOUT_EVENT, onOpen);
  }, [about, handleSelect]);

  return (
    <div className="about-root">
      {selected ? (
        <AboutDetail
          story={selected}
          related={about.filter((item) => item.id !== selected.id)}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      ) : (
        <AboutGrid items={about} onSelect={handleSelect} />
      )}
    </div>
  );
}
