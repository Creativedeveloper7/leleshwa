export const OPEN_DINING_EVENT = 'open-dining';

export function openDiningView(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_DINING_EVENT, { detail: { id } }));
}
