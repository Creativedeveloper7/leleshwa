import { useCallback, useEffect, useState } from 'react';
import { getCuratedEventById } from '../../constants/curatedEvents';
import { OPEN_EVENT_EVENT } from '../../utils/eventEvents';
import { EventDetail } from './EventDetail';
import { EventGrid } from './EventGrid';

export function EventSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getCuratedEventById(selectedId) : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && getCuratedEventById(id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_EVENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT_EVENT, onOpen);
  }, [handleSelect]);

  return (
    <div className="event-root">
      {selected ? (
        <EventDetail event={selected} onBack={handleBack} onSelect={handleSelect} />
      ) : (
        <EventGrid onSelect={handleSelect} />
      )}
    </div>
  );
}
