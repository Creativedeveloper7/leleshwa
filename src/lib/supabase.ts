import type { ExperienceType, ReservationFormData } from '../types/reservation';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_KEY = 'leleshwa-admin-session';

export interface BookingResponse {
  id: string;
  message: string;
  sent_at: string;
  channel: 'email' | 'sms';
}

export interface ReservationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  experience_type: ExperienceType;
  special_requests: string;
  details: Record<string, string>;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
  booking_responses: BookingResponse[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface AdminSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email?: string };
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: { id: string; email?: string };
}

function configuration(): { url: string; anonKey: string } {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase is not configured on this deploy. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then Redeploy.',
    );
  }
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
}

function isNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof Error && /failed to fetch|networkerror|load failed/i.test(error.message))
  );
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    error_description?: string;
    error?: string;
  };
  if (!response.ok) {
    throw new Error(
      data.message || data.error_description || data.error || 'The request could not be completed.',
    );
  }
  return data;
}

async function invokeFunction<T>(
  name: string,
  body: unknown,
  accessToken?: string,
): Promise<T> {
  const { url, anonKey } = configuration();
  try {
    const response = await fetch(`${url}/functions/v1/${name}`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${accessToken ?? anonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
  } catch (error) {
    if (isNetworkError(error)) {
      throw new Error(
        `Unable to reach the ${name} service. Deploy the Edge Function or check ALLOWED_ORIGIN / CORS settings.`,
      );
    }
    throw error;
  }
}

function normalizeTime(value: string): string {
  const match = value.trim().match(/^([01]\d|2[0-3]):([0-5]\d)/);
  return match ? `${match[1]}:${match[2]}` : value.trim();
}

function reservationPayload(experience: ExperienceType, form: ReservationFormData) {
  const {
    fullName,
    email,
    phone,
    preferredDate,
    preferredTime,
    numberOfGuests,
    specialRequests,
    ...details
  } = form;

  return {
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    reservationDate: preferredDate,
    reservationTime: normalizeTime(preferredTime),
    partySize: Number(numberOfGuests),
    experienceType: experience,
    specialRequests: specialRequests.trim(),
    details,
  };
}

async function createReservationViaRest(
  experience: ExperienceType,
  form: ReservationFormData,
): Promise<{ reservationId: string; status: string; notificationSent: boolean }> {
  const { url, anonKey } = configuration();
  const payload = reservationPayload(experience, form);

  const response = await fetch(`${url}/rest/v1/reservations`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      reservation_date: payload.reservationDate,
      reservation_time: payload.reservationTime,
      party_size: payload.partySize,
      experience_type: payload.experienceType,
      special_requests: payload.specialRequests,
      details: payload.details,
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as {
      message?: string;
      hint?: string;
    };
    throw new Error(data.message || data.hint || 'Unable to save the reservation.');
  }

  return {
    reservationId: '',
    status: 'pending',
    notificationSent: false,
  };
}

export async function createReservation(
  experience: ExperienceType,
  form: ReservationFormData,
): Promise<{ reservationId: string; status: string; notificationSent: boolean }> {
  const payload = reservationPayload(experience, form);

  try {
    return await invokeFunction('create-reservation', payload);
  } catch (error) {
    // Edge Function may be undeployed or blocked by CORS — save via RLS insert instead.
    if (
      isNetworkError(error) ||
      (error instanceof Error &&
        /unable to reach the create-reservation|failed to fetch|not found/i.test(error.message))
    ) {
      return createReservationViaRest(experience, form);
    }
    throw error;
  }
}

async function subscribeNewsletterViaRest(
  email: string,
  source: string,
): Promise<{ ok: boolean; alreadySubscribed?: boolean }> {
  const { url, anonKey } = configuration();
  const response = await fetch(`${url}/rest/v1/newsletter_subscribers`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      source,
      status: 'active',
    }),
  });

  if (response.ok) return { ok: true, alreadySubscribed: false };

  const data = (await response.json().catch(() => ({}))) as {
    code?: string;
    message?: string;
  };

  // Unique violation = already subscribed
  if (response.status === 409 || data.code === '23505') {
    return { ok: true, alreadySubscribed: true };
  }

  throw new Error(data.message || 'Unable to subscribe right now.');
}

export async function subscribeNewsletter(
  email: string,
  source = 'footer',
): Promise<{ ok: boolean; alreadySubscribed?: boolean }> {
  try {
    return await invokeFunction('subscribe-newsletter', { email, source });
  } catch (error) {
    if (
      isNetworkError(error) ||
      (error instanceof Error &&
        /unable to reach the subscribe-newsletter|failed to fetch|not found/i.test(error.message))
    ) {
      return subscribeNewsletterViaRest(email, source);
    }
    throw error;
  }
}

function persistSession(auth: AuthResponse): AdminSession {
  const session: AdminSession = {
    access_token: auth.access_token,
    refresh_token: auth.refresh_token,
    expires_at: Date.now() + auth.expires_in * 1000,
    user: auth.user,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function signInAdmin(email: string, password: string): Promise<AdminSession> {
  const { url, anonKey } = configuration();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: anonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  return persistSession(await parseResponse<AuthResponse>(response));
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AdminSession;
    if (session.expires_at > Date.now() + 60_000) return session;

    const { url, anonKey } = configuration();
    const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    return persistSession(await parseResponse<AuthResponse>(response));
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function signOutAdmin(): void {
  localStorage.removeItem(SESSION_KEY);
}

async function adminRest<T>(session: AdminSession, path: string): Promise<T> {
  const { url, anonKey } = configuration();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  return parseResponse<T>(response);
}

export function getReservations(session: AdminSession): Promise<ReservationRecord[]> {
  return adminRest(
    session,
    'reservations?select=*,booking_responses(*)&order=created_at.desc',
  );
}

export function getNewsletterSubscribers(
  session: AdminSession,
): Promise<NewsletterSubscriber[]> {
  return adminRest(
    session,
    'newsletter_subscribers?select=*&order=subscribed_at.desc',
  );
}

export async function respondToReservation(
  session: AdminSession,
  reservationId: string,
  status: 'confirmed' | 'cancelled',
  message?: string,
): Promise<void> {
  try {
    await invokeFunction(
      'send-booking-response',
      { reservationId, status, message },
      session.access_token,
    );
    return;
  } catch (error) {
    if (
      !(
        isNetworkError(error) ||
        (error instanceof Error &&
          /unable to reach the send-booking-response|failed to fetch|not found/i.test(
            error.message,
          ))
      )
    ) {
      throw error;
    }
  }

  // Edge Function unavailable — update status directly with the staff session.
  const { url, anonKey } = configuration();
  const response = await fetch(
    `${url}/rest/v1/reservations?id=eq.${encodeURIComponent(reservationId)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message || `Unable to mark reservation as ${status}.`);
  }

  const historyMessage =
    message?.trim() ||
    (status === 'confirmed'
      ? 'Reservation confirmed from the admin desk (email pending Edge Function deploy).'
      : 'Reservation cancelled from the admin desk (email pending Edge Function deploy).');

  await fetch(`${url}/rest/v1/booking_responses`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      reservation_id: reservationId,
      message: historyMessage,
      channel: 'email',
    }),
  }).catch(() => {
    // History logging is optional when the Edge Function is offline.
  });
}
