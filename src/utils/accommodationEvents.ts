export const OPEN_ACCOMMODATION_EVENT = 'open-accommodation';

export function openAccommodationDetail(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_ACCOMMODATION_EVENT, { detail: { id } }));
}
