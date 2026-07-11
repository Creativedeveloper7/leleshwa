import { useCallback, useEffect, useState } from 'react';
import { getAccommodationById } from '../../constants/accommodations';
import { OPEN_ACCOMMODATION_EVENT } from '../../utils/accommodationEvents';
import { AccommodationDetail } from './AccommodationDetail';
import { AccommodationGrid } from './AccommodationGrid';

export function AccommodationSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getAccommodationById(selectedId) : null;

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
      if (id && getAccommodationById(id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_ACCOMMODATION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ACCOMMODATION_EVENT, onOpen);
  }, [handleSelect]);

  return (
    <div className="accommodation-root">
      {selected ? (
        <AccommodationDetail
          accommodation={selected}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      ) : (
        <AccommodationGrid onSelect={handleSelect} />
      )}
    </div>
  );
}
