import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OPEN_DINING_EVENT } from '../../utils/diningEvents';
import { DiningGrid } from './DiningGrid';
import { MenuSlideshow } from './MenuSlideshow';
import { OutdoorDiningForm } from './OutdoorDiningForm';

export function DiningSection() {
  const { dining, outdoorDiningLocations } = useSiteContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? dining.find((item) => item.id === selectedId) ?? null
    : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById('dining')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && dining.some((item) => item.id === id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_DINING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_DINING_EVENT, onOpen);
  }, [dining, handleSelect]);

  return (
    <div className="dining-root">
      {!selected ? (
        <DiningGrid items={dining} onSelect={handleSelect} />
      ) : selected.viewType === 'menu' && selected.menuImages ? (
        <MenuSlideshow title={selected.name} images={selected.menuImages} onBack={handleBack} />
      ) : (
        <OutdoorDiningForm locations={outdoorDiningLocations} onBack={handleBack} />
      )}
    </div>
  );
}
