interface EmailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(input: EmailInput): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM_EMAIL');
  if (!apiKey || !from) throw new Error('Resend is not configured');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo ?? Deno.env.get('RESEND_REPLY_TO') ?? undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend request failed:', response.status, detail);
    throw new Error('Email delivery failed');
  }
}

export function emailLayout(title: string, content: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f5f0e6;color:#2d1b14;font-family:Arial,sans-serif">
    <div style="max-width:620px;margin:0 auto;padding:40px 24px">
      <div style="background:#fff;border:1px solid #e8e1d5;padding:36px">
        <p style="margin:0 0 8px;color:#9b7848;font-size:12px;letter-spacing:2px;text-transform:uppercase">Leleshwa Getaway</p>
        <h1 style="margin:0 0 24px;font-size:28px;font-weight:500">${title}</h1>
        ${content}
        <p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #e8e1d5;color:#705d50;font-size:13px">
          Leleshwa Getaway reservations team
        </p>
      </div>
    </div>
  </body>
</html>`;
}
