export const OPEN_ABOUT_EVENT = 'open-about';

export function openAboutDetail(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_ABOUT_EVENT, { detail: { id } }));
}
