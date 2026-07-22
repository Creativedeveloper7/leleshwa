import { subscribeNewsletter } from '../lib/supabase';
import type { NewsletterSubscribePayload, NewsletterSubscribeResult } from '../types/newsletter';

export async function subscribeToNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterSubscribeResult> {
  try {
    await subscribeNewsletter(payload.email, payload.source);
    return { ok: true };
  } catch (error) {
    console.error('Newsletter subscribe failed:', error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'Connection unavailable. Please try again shortly.',
    };
  }
}
