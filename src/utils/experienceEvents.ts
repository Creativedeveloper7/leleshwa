export const OPEN_EXPERIENCE_EVENT = 'open-experience';

export function openExperienceDetail(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EXPERIENCE_EVENT, { detail: { id } }));
}
