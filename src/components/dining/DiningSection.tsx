import { useCallback, useEffect, useState } from 'react';
import { getDiningVenueById } from '../../constants/diningVenues';
import { OPEN_DINING_EVENT } from '../../utils/diningEvents';
import { DiningGrid } from './DiningGrid';
import { MenuSlideshow } from './MenuSlideshow';
import { OutdoorDiningForm } from './OutdoorDiningForm';

export function DiningSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getDiningVenueById(selectedId) : null;

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
      if (id && getDiningVenueById(id)) {
        handleSelect(id);
      }
    };

    window.addEventListener(OPEN_DINING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_DINING_EVENT, onOpen);
  }, [handleSelect]);

  return (
    <div className="dining-root">
      {!selected ? (
        <DiningGrid onSelect={handleSelect} />
      ) : selected.viewType === 'menu' && selected.menuImages ? (
        <MenuSlideshow title={selected.name} images={selected.menuImages} onBack={handleBack} />
      ) : (
        <OutdoorDiningForm onBack={handleBack} />
      )}
    </div>
  );
}
