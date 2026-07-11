import { useCallback, useEffect, useState } from 'react';
import { getCuratedExperienceById } from '../../constants/curatedExperiences';
import { OPEN_EXPERIENCE_EVENT } from '../../utils/experienceEvents';
import { ExperienceDetail } from './ExperienceDetail';
import { ExperienceGrid } from './ExperienceGrid';

export function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getCuratedExperienceById(selectedId) : null;

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
      if (id && getCuratedExperienceById(id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_EXPERIENCE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EXPERIENCE_EVENT, onOpen);
  }, [handleSelect]);

  return (
    <div className="experience-root">
      {selected ? (
        <ExperienceDetail experience={selected} onBack={handleBack} onSelect={handleSelect} />
      ) : (
        <ExperienceGrid onSelect={handleSelect} />
      )}
    </div>
  );
}
