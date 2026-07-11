import { useCallback, useEffect, useState } from 'react';
import { ReservationModal } from './components/reservation/ReservationModal';
import { getAnchorFromElement, type ModalAnchor } from './types/modal';

export const OPEN_RESERVATION_EVENT = 'open-reservation-modal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<ModalAnchor | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const openModal = useCallback((el: HTMLElement | null = null) => {
    setTriggerEl(el);
    setAnchor(el ? getAnchorFromElement(el) : null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      setAnchor(null);
      setTriggerEl(null);
    }, 320);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerEl) return;

    const syncAnchor = () => setAnchor(getAnchorFromElement(triggerEl));
    syncAnchor();
    window.addEventListener('resize', syncAnchor);
    window.addEventListener('scroll', syncAnchor, true);

    return () => {
      window.removeEventListener('resize', syncAnchor);
      window.removeEventListener('scroll', syncAnchor, true);
    };
  }, [isOpen, triggerEl]);

  useEffect(() => {
    const handleTrigger = (event: Event) => {
      const target = (event.target as HTMLElement).closest('[data-reserve-trigger]');
      if (!target) return;
      event.preventDefault();
      openModal(target as HTMLElement);
    };

    document.addEventListener('click', handleTrigger);

    const handleCustomOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ element?: HTMLElement }>).detail;
      openModal(detail?.element ?? null);
    };

    window.addEventListener(OPEN_RESERVATION_EVENT, handleCustomOpen);

    return () => {
      document.removeEventListener('click', handleTrigger);
      window.removeEventListener(OPEN_RESERVATION_EVENT, handleCustomOpen);
    };
  }, [openModal]);

  return <ReservationModal isOpen={isOpen} onClose={closeModal} anchor={anchor} />;
}
