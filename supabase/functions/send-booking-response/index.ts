import { emailLayout, sendEmail } from '../_shared/email.ts';
import {
  cleanString,
  escapeHtml,
  handleOptions,
  jsonResponse,
  readJson,
} from '../_shared/http.ts';
import { requireAdmin, serviceRequest } from '../_shared/supabase.ts';

interface Reservation {
  id: string;
  name: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  experience_type: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const STATUS_COPY = {
  confirmed: {
    subject: 'Your Leleshwa reservation is confirmed',
    title: 'Reservation confirmed',
    message: 'We are delighted to confirm your reservation with Leleshwa Getaway.',
  },
  cancelled: {
    subject: 'Your Leleshwa reservation update',
    title: 'Reservation cancelled',
    message:
      'Your reservation has been cancelled. Please reply to this email if you would like us to help arrange another date.',
  },
} as const;

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') {
    return jsonResponse({ message: 'Method not allowed' }, 405, request);
  }

  try {
    await requireAdmin(request);
    const body = await readJson(request);
    const reservationId = cleanString(body.reservationId, 36);
    const status = cleanString(body.status, 20) as keyof typeof STATUS_COPY;
    const customMessage = cleanString(body.message, 4000);

    if (!/^[0-9a-f-]{36}$/i.test(reservationId) || !STATUS_COPY[status]) {
      return jsonResponse({ message: 'Invalid reservation response.' }, 400, request);
    }

    const reservations = await serviceRequest<Reservation[]>(
      `/rest/v1/reservations?id=eq.${encodeURIComponent(reservationId)}&select=id,name,email,reservation_date,reservation_time,experience_type,status`,
    );
    const reservation = reservations[0];
    if (!reservation) {
      return jsonResponse({ message: 'Reservation not found.' }, 404, request);
    }
    if (reservation.status === status) {
      return jsonResponse({ ok: true, status, unchanged: true }, 200, request);
    }

    await serviceRequest(
      `/rest/v1/reservations?id=eq.${encodeURIComponent(reservationId)}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ status }),
      },
    );

    const copy = STATUS_COPY[status];
    const message = customMessage || copy.message;
    const html = emailLayout(
      copy.title,
      `<p style="font-size:16px;line-height:1.7">Dear ${escapeHtml(reservation.name)},</p>
       <p style="font-size:16px;line-height:1.7">${escapeHtml(message)}</p>
       <div style="margin:24px 0;padding:18px;background:#f5f0e6">
         <strong>${escapeHtml(reservation.experience_type)}</strong><br>
         ${escapeHtml(reservation.reservation_date)} at ${escapeHtml(reservation.reservation_time)}
       </div>`,
    );

    try {
      await sendEmail({ to: reservation.email, subject: copy.subject, html });
      await serviceRequest('/rest/v1/booking_responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_id: reservation.id,
          message,
          channel: 'email',
        }),
      });
    } catch (error) {
      console.error('Status email failed after reservation update:', error);
      return jsonResponse({
        message: `Reservation marked ${status}, but the email could not be delivered.`,
        statusUpdated: true,
      }, 502, request);
    }

    return jsonResponse({ ok: true, status }, 200, request);
  } catch (error) {
    console.error('send-booking-response failed:', error);
    const unauthorized = error instanceof Error && error.message === 'Unauthorized';
    return jsonResponse(
      { message: unauthorized ? 'Your admin session has expired.' : 'Unable to send response.' },
      unauthorized ? 401 : 500,
      request,
    );
  }
});
