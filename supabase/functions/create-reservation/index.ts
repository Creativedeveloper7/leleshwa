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
const PHONE_PATTERN = /^[+]?[\d\s()-]{8,30}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const EXPERIENCE_TYPES = ['accommodation', 'dining', 'activities', 'events'];

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  experience_type: string;
  special_requests: string;
  status: 'pending';
}

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') {
    return jsonResponse({ message: 'Method not allowed' }, 405, request);
  }

  try {
    const body = await readJson(request);
    const name = cleanString(body.name, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 30);
    const reservationDate = cleanString(body.reservationDate, 10);
    const reservationTime = cleanString(body.reservationTime, 5);
    const experienceType = cleanString(body.experienceType, 30);
    const specialRequests = cleanString(body.specialRequests, 4000);
    const partySize = Number(body.partySize);
    const details =
      body.details && typeof body.details === 'object' && !Array.isArray(body.details)
        ? body.details
        : {};

    const today = new Date().toISOString().slice(0, 10);
    if (
      name.length < 2 ||
      !EMAIL_PATTERN.test(email) ||
      !PHONE_PATTERN.test(phone) ||
      !DATE_PATTERN.test(reservationDate) ||
      reservationDate < today ||
      !TIME_PATTERN.test(reservationTime) ||
      !Number.isInteger(partySize) ||
      partySize < 1 ||
      partySize > 500 ||
      !EXPERIENCE_TYPES.includes(experienceType) ||
      JSON.stringify(details).length > 20_000
    ) {
      return jsonResponse({ message: 'Please check the reservation details.' }, 400, request);
    }

    const reservations = await serviceRequest<Reservation[]>('/rest/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        party_size: partySize,
        experience_type: experienceType,
        special_requests: specialRequests,
        details,
      }),
    });
    const reservation = reservations[0];
    if (!reservation) throw new Error('Reservation was not returned after insert');

    const guestMessage =
      'We have received your reservation enquiry. Our reservations team will review the details and contact you shortly.';
    const guestEmail = emailLayout(
      'Reservation enquiry received',
      `<p style="font-size:16px;line-height:1.7">Dear ${escapeHtml(name)},</p>
       <p style="font-size:16px;line-height:1.7">${guestMessage}</p>
       <div style="margin:24px 0;padding:18px;background:#f5f0e6">
         <strong>${escapeHtml(experienceType)}</strong><br>
         ${escapeHtml(reservationDate)} at ${escapeHtml(reservationTime)}<br>
         ${partySize} guest${partySize === 1 ? '' : 's'}
       </div>`,
    );

    let notificationSent = false;
    try {
      await sendEmail({ to: email, subject: 'We received your Leleshwa enquiry', html: guestEmail });
      notificationSent = true;
      await serviceRequest('/rest/v1/booking_responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_id: reservation.id,
          message: guestMessage,
          channel: 'email',
        }),
      });
    } catch (error) {
      console.error('Guest acknowledgement failed:', error);
    }

    const reservationsEmail = Deno.env.get('RESERVATIONS_EMAIL');
    if (reservationsEmail) {
      const dashboardUrl = Deno.env.get('ADMIN_DASHBOARD_URL');
      const adminEmail = emailLayout(
        'New reservation enquiry',
        `<p style="font-size:16px;line-height:1.7"><strong>${escapeHtml(name)}</strong> submitted a new ${escapeHtml(experienceType)} enquiry.</p>
         <p style="line-height:1.8">
           <strong>Email:</strong> ${escapeHtml(email)}<br>
           <strong>Phone:</strong> ${escapeHtml(phone)}<br>
           <strong>Date:</strong> ${escapeHtml(reservationDate)} at ${escapeHtml(reservationTime)}<br>
           <strong>Party:</strong> ${partySize}
         </p>
         <p>Sign in to the Leleshwa admin dashboard to review and respond.</p>
         ${dashboardUrl ? `<p><a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;padding:12px 18px;background:#3a291e;color:#fff;text-decoration:none">Open reservations desk</a></p>` : ''}`,
      );
      try {
        await sendEmail({
          to: reservationsEmail,
          subject: `New reservation enquiry — ${name}`,
          html: adminEmail,
          replyTo: email,
        });
      } catch (error) {
        console.error('Internal notification failed:', error);
      }
    }

    return jsonResponse(
      { reservationId: reservation.id, status: reservation.status, notificationSent },
      201,
      request,
    );
  } catch (error) {
    console.error('create-reservation failed:', error);
    const message = error instanceof Error && error.message.includes('body')
      ? error.message
      : 'Unable to create the reservation right now.';
    return jsonResponse({ message }, 500, request);
  }
});
