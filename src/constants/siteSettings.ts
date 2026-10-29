export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

/** Instagram is confirmed; Facebook and Pinterest are still placeholders. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/leleshwagetaway/',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/leleshwa',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    href: 'https://www.pinterest.com/leleshwa',
  },
];

export const NEWSLETTER_SUBSCRIBE_URL =
  import.meta.env?.VITE_NEWSLETTER_API_URL ?? '/api/newsletter/subscribe';
