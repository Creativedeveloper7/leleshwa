import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OPEN_EVENT_EVENT } from '../../utils/eventEvents';
import { EventDetail } from './EventDetail';
import { EventGrid } from './EventGrid';

export function EventSection() {
  const { events } = useSiteContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? events.find((item) => item.id === selectedId) ?? null
    : null;

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
      if (id && events.some((item) => item.id === id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_EVENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT_EVENT, onOpen);
  }, [events, handleSelect]);

  return (
    <div className="event-root">
      {selected ? (
        <EventDetail
          event={selected}
          related={events.filter((item) => item.id !== selected.id)}
          onBack={handleBack}
          onSelect={handleSelect}
        />
      ) : (
        <EventGrid items={events} onSelect={handleSelect} />
      )}
    </div>
  );
}
