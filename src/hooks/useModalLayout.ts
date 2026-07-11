import { useLayoutEffect, useState } from 'react';
import type { ModalAnchor } from '../types/modal';
import { computeModalLayout, type ModalLayout } from '../utils/modalPosition';

export function useModalLayout(anchor: ModalAnchor | null, isOpen: boolean) {
  const [layout, setLayout] = useState<ModalLayout | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setLayout(null);
      return;
    }

    const update = () => setLayout(computeModalLayout(anchor));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isOpen, anchor]);

  return layout;
}
