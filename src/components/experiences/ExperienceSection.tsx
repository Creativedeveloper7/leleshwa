import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OPEN_EXPERIENCE_EVENT } from '../../utils/experienceEvents';
import { ExperienceDetail } from './ExperienceDetail';
import { ExperienceGrid } from './ExperienceGrid';

export function ExperienceSection() {
  const { experiences } = useSiteContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? experiences.find((item) => item.id === selectedId) ?? null
    : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && experiences.some((item) => item.id === id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_EXPERIENCE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EXPERIENCE_EVENT, onOpen);
  }, [experiences, handleSelect]);

  return (
    <div className="experience-root">
      {selected ? (
        <ExperienceDetail
          experience={selected}
          related={experiences.filter((item) => item.id !== selected.id)}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      ) : (
        <ExperienceGrid items={experiences} onSelect={handleSelect} />
      )}
    </div>
  );
}
