import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OPEN_ACCOMMODATION_EVENT } from '../../utils/accommodationEvents';
import { AccommodationDetail } from './AccommodationDetail';
import { AccommodationGrid } from './AccommodationGrid';

export function AccommodationSection() {
  const { accommodations } = useSiteContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? accommodations.find((item) => item.id === selectedId) ?? null
    : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('accommodation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && accommodations.some((item) => item.id === id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_ACCOMMODATION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ACCOMMODATION_EVENT, onOpen);
  }, [accommodations, handleSelect]);

  return (
    <div className="accommodation-root">
      {selected ? (
        <AccommodationDetail
          accommodation={selected}
          related={accommodations.filter((item) => item.id !== selected.id)}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      ) : (
        <AccommodationGrid items={accommodations} onSelect={handleSelect} />
      )}
    </div>
  );
}
