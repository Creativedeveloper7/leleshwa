import { useLayoutEffect, useState, type RefObject } from 'react';
import type { ModalAnchor } from '../types/modal';
import { computeModalPosition, type ModalPosition } from '../utils/modalPosition';

const DESKTOP_MAX_WIDTH = 960;

export function useModalPosition(
  modalRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  anchor: ModalAnchor | null,
  deps: unknown[] = [],
) {
  const [position, setPosition] = useState<ModalPosition | null>(null);
  const [isPositioned, setIsPositioned] = useState(false);

  useLayoutEffect(() => {
    if (!isOpen || !modalRef.current) {
      setPosition(null);
      setIsPositioned(false);
      return;
    }

    const update = () => {
      const el = modalRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = computeModalPosition(
        anchor,
        DESKTOP_MAX_WIDTH,
        rect.height || el.scrollHeight,
      );
      setPosition(next);
      setIsPositioned(true);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(modalRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen, anchor, modalRef, ...deps]);

  return { position, isPositioned };
}
