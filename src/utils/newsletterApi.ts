import { NEWSLETTER_SUBSCRIBE_URL } from '../constants/siteSettings';
import type { NewsletterSubscribePayload, NewsletterSubscribeResult } from '../types/newsletter';

export async function subscribeToNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterSubscribeResult> {
  try {
    const response = await fetch(NEWSLETTER_SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }

    let message = 'Unable to subscribe right now. Please try again.';
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      // use default message
    }

    return { ok: false, message };
  } catch (error) {
    console.error('Newsletter subscribe failed:', error);
    return {
      ok: false,
      message: 'Connection unavailable. Please try again shortly.',
    };
  }
}
