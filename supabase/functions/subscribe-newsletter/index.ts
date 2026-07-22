import { emailLayout, sendEmail } from '../_shared/email.ts';
import {
  cleanString,
  escapeHtml,
  handleOptions,
  jsonResponse,
  readJson,
} from '../_shared/http.ts';
import { serviceRequest } from '../_shared/supabase.ts';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Subscriber {
  email: string;
  status: 'active' | 'unsubscribed';
}

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') {
    return jsonResponse({ message: 'Method not allowed' }, 405, request);
  }

  try {
    const body = await readJson(request);
    const email = cleanString(body.email, 254).toLowerCase();
    const source = cleanString(body.source, 80) || 'website';

    if (!EMAIL_PATTERN.test(email)) {
      return jsonResponse({ message: 'Please enter a valid email address.' }, 400, request);
    }

    const existing = await serviceRequest<Subscriber[]>(
      `/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email)}&select=email,status`,
    );
    if (existing[0]?.status === 'active') {
      return jsonResponse({ ok: true, alreadySubscribed: true }, 200, request);
    }

    await serviceRequest(
      '/rest/v1/newsletter_subscribers?on_conflict=email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify({
          email,
          source,
          status: 'active',
          subscribed_at: new Date().toISOString(),
        }),
      },
    );

    const html = emailLayout(
      'Welcome to Leleshwa',
      `<p style="font-size:16px;line-height:1.7">Thank you for joining us.</p>
       <p style="font-size:16px;line-height:1.7">Stories from the bush, seasonal updates, and new experiences will arrive at ${escapeHtml(email)}.</p>`,
    );
    try {
      await sendEmail({ to: email, subject: 'Welcome to Leleshwa', html });
    } catch (error) {
      console.error('Newsletter welcome email failed:', error);
    }

    return jsonResponse({ ok: true, alreadySubscribed: false }, 200, request);
  } catch (error) {
    console.error('subscribe-newsletter failed:', error);
    return jsonResponse({ message: 'Unable to subscribe right now.' }, 500, request);
  }
});
