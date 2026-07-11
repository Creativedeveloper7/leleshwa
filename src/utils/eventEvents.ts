export const OPEN_EVENT_EVENT = 'open-event';

export function openEventDetail(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT_EVENT, { detail: { id } }));
}
