export type NewsletterSubmitState = 'idle' | 'loading' | 'success' | 'error';

export interface NewsletterSubscribePayload {
  email: string;
  source: 'footer';
}

export interface NewsletterSubscribeResult {
  ok: boolean;
  message?: string;
}
