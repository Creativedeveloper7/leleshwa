import type { ModalAnchor } from '../types/modal';

export interface ModalLayout {
  top: number;
  left: number;
  width: number;
  height: number;
  maxHeight: number;
  transformOrigin: string;
  isMobile: boolean;
  borderRadius: number;
}

const DESKTOP_MAX_WIDTH = 880;
const DESKTOP_HEIGHT_VH = 0.9;
const PAD = 24;

export function computeModalLayout(
  anchor: ModalAnchor | null,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
): ModalLayout {
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  if (isMobile) {
    return {
      top: 0,
      left: 0,
      width: viewportWidth,
      height: viewportHeight,
      maxHeight: viewportHeight,
      transformOrigin: '50% 100%',
      isMobile: true,
      borderRadius: 0,
    };
  }

  const width = isTablet
    ? viewportWidth * 0.95
    : Math.min(DESKTOP_MAX_WIDTH, viewportWidth - PAD * 2);
  const height = Math.min(viewportHeight * DESKTOP_HEIGHT_VH, viewportHeight - PAD * 2);
  const left = (viewportWidth - width) / 2;
  const top = (viewportHeight - height) / 2;

  const originX = anchor ? anchor.x - left : width / 2;
  const originY = anchor ? anchor.y - top : height / 2;

  return {
    top,
    left,
    width,
    height,
    maxHeight: height,
    transformOrigin: `${originX}px ${originY}px`,
    isMobile: false,
    borderRadius: 16,
  };
}
