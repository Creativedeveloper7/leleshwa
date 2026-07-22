import {
  CalendarDays,
  CheckCircle2,
  Inbox,
  LogOut,
  Mail,
  RefreshCw,
  Users,
  XCircle,
} from 'lucide-react';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAdminSession,
  getNewsletterSubscribers,
  getReservations,
  respondToReservation,
  signInAdmin,
  signOutAdmin,
  type AdminSession,
  type NewsletterSubscriber,
  type ReservationRecord,
} from '../lib/supabase';

type DashboardTab = 'reservations' | 'newsletter';
type ReservationFilter = 'all' | ReservationRecord['status'];

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function Login({ onAuthenticated }: { onAuthenticated: (session: AdminSession) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      onAuthenticated(await signInAdmin(email, password));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <section className="admin-login__panel">
        <p className="admin-eyebrow">Leleshwa Getaway</p>
        <h1>Reservations desk</h1>
        <p className="admin-muted">Sign in with your staff credentials.</p>
        <form onSubmit={submit} className="admin-login__form">
          <label>
            Email address
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-button admin-button--primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}

interface ReservationDetailProps {
  reservation: ReservationRecord;
  busy: boolean;
  onRespond: (
    reservation: ReservationRecord,
    status: 'confirmed' | 'cancelled',
    message: string,
  ) => Promise<void>;
}

function ReservationDetail({ reservation, busy, onRespond }: ReservationDetailProps) {
  const [message, setMessage] = useState('');
  const details = Object.entries(reservation.details).filter(([, value]) => value);

  useEffect(() => setMessage(''), [reservation.id]);

  const respond = async (status: 'confirmed' | 'cancelled') => {
    if (
      status === 'cancelled' &&
      !window.confirm(`Cancel ${reservation.name}'s reservation and email them?`)
    ) return;
    await onRespond(reservation, status, message);
    setMessage('');
  };

  return (
    <aside className="admin-detail">
      <div className="admin-detail__heading">
        <div>
          <span className={`admin-status admin-status--${reservation.status}`}>
            {reservation.status}
          </span>
          <h2>{reservation.name}</h2>
          <p>{reservation.experience_type}</p>
        </div>
      </div>

      <dl className="admin-detail__grid">
        <div><dt>Email</dt><dd><a href={`mailto:${reservation.email}`}>{reservation.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href={`tel:${reservation.phone}`}>{reservation.phone}</a></dd></div>
        <div><dt>Date</dt><dd>{formatDate(reservation.reservation_date)} · {reservation.reservation_time.slice(0, 5)}</dd></div>
        <div><dt>Party size</dt><dd>{reservation.party_size}</dd></div>
        {details.map(([key, value]) => (
          <div key={key}>
            <dt>{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>

      {reservation.special_requests && (
        <div className="admin-note">
          <strong>Special requests</strong>
          <p>{reservation.special_requests}</p>
        </div>
      )}

      <div className="admin-response">
        <label htmlFor="response-message">Optional message to guest</label>
        <textarea
          id="response-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Add a personal note to the standard status email…"
          maxLength={4000}
        />
        <div className="admin-response__actions">
          <button
            className="admin-button admin-button--confirm"
            disabled={busy || reservation.status === 'confirmed'}
            onClick={() => respond('confirmed')}
          >
            <CheckCircle2 size={17} /> Confirm
          </button>
          <button
            className="admin-button admin-button--cancel"
            disabled={busy || reservation.status === 'cancelled'}
            onClick={() => respond('cancelled')}
          >
            <XCircle size={17} /> Cancel
          </button>
        </div>
      </div>

      <div className="admin-history">
        <h3>Email history</h3>
        {reservation.booking_responses.length === 0 ? (
          <p className="admin-muted">No emails logged yet.</p>
        ) : reservation.booking_responses
          .slice()
          .sort((a, b) => b.sent_at.localeCompare(a.sent_at))
          .map((response) => (
            <article key={response.id}>
              <time>{formatDateTime(response.sent_at)}</time>
              <p>{response.message}</p>
            </article>
          ))}
      </div>
    </aside>
  );
}

function Dashboard({
  session,
  onSignOut,
}: {
  session: AdminSession;
  onSignOut: () => void;
}) {
  const [tab, setTab] = useState<DashboardTab>('reservations');
  const [filter, setFilter] = useState<ReservationFilter>('all');
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [reservationRows, subscriberRows] = await Promise.all([
        getReservations(session),
        getNewsletterSubscribers(session),
      ]);
      setReservations(reservationRows);
      setSubscribers(subscriberRows);
      setSelectedId((current) => current ?? reservationRows[0]?.id ?? null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredReservations = useMemo(
    () => filter === 'all' ? reservations : reservations.filter((item) => item.status === filter),
    [filter, reservations],
  );
  const selected = reservations.find((item) => item.id === selectedId) ?? null;
  const pending = reservations.filter((item) => item.status === 'pending').length;
  const confirmed = reservations.filter((item) => item.status === 'confirmed').length;
  const activeSubscribers = subscribers.filter((item) => item.status === 'active').length;

  const respond = async (
    reservation: ReservationRecord,
    status: 'confirmed' | 'cancelled',
    message: string,
  ) => {
    setBusy(true);
    setError('');
    try {
      await respondToReservation(session, reservation.id, status, message || undefined);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to update reservation.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Leleshwa Getaway</p>
          <h1>Reservations desk</h1>
        </div>
        <div className="admin-header__actions">
          <span>{session.user.email}</span>
          <button className="admin-icon-button" onClick={load} title="Refresh" disabled={loading}>
            <RefreshCw size={18} className={loading ? 'admin-spin' : ''} />
          </button>
          <button className="admin-button" onClick={onSignOut}><LogOut size={17} /> Sign out</button>
        </div>
      </header>

      <section className="admin-stats" aria-label="Dashboard summary">
        <article><Inbox /><div><strong>{pending}</strong><span>Pending enquiries</span></div></article>
        <article><CalendarDays /><div><strong>{confirmed}</strong><span>Confirmed bookings</span></div></article>
        <article><Users /><div><strong>{reservations.length}</strong><span>Total reservations</span></div></article>
        <article><Mail /><div><strong>{activeSubscribers}</strong><span>Newsletter subscribers</span></div></article>
      </section>

      {error && <p className="admin-banner admin-error" role="alert">{error}</p>}

      <nav className="admin-tabs">
        <button className={tab === 'reservations' ? 'active' : ''} onClick={() => setTab('reservations')}>
          Reservations
        </button>
        <button className={tab === 'newsletter' ? 'active' : ''} onClick={() => setTab('newsletter')}>
          Newsletter
        </button>
      </nav>

      {tab === 'reservations' ? (
        <main className="admin-workspace">
          <section className="admin-list">
            <div className="admin-filters">
              {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((item) => (
                <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
                  {item}
                </button>
              ))}
            </div>
            {loading && reservations.length === 0 ? (
              <p className="admin-empty">Loading enquiries…</p>
            ) : filteredReservations.length === 0 ? (
              <p className="admin-empty">No {filter === 'all' ? '' : filter} reservations found.</p>
            ) : (
              filteredReservations.map((reservation) => (
                <button
                  key={reservation.id}
                  className={`admin-list-item${selectedId === reservation.id ? ' active' : ''}`}
                  onClick={() => setSelectedId(reservation.id)}
                >
                  <div><strong>{reservation.name}</strong><span>{reservation.experience_type}</span></div>
                  <div><time>{formatDate(reservation.reservation_date)}</time><span className={`admin-status admin-status--${reservation.status}`}>{reservation.status}</span></div>
                </button>
              ))
            )}
          </section>
          {selected ? (
            <ReservationDetail reservation={selected} busy={busy} onRespond={respond} />
          ) : (
            <aside className="admin-detail admin-empty">Select an enquiry to view its details.</aside>
          )}
        </main>
      ) : (
        <main className="admin-subscribers">
          <div className="admin-table-row admin-table-row--head">
            <span>Email</span><span>Source</span><span>Subscribed</span><span>Status</span>
          </div>
          {subscribers.map((subscriber) => (
            <div className="admin-table-row" key={subscriber.id}>
              <strong>{subscriber.email}</strong>
              <span>{subscriber.source}</span>
              <span>{formatDate(subscriber.subscribed_at)}</span>
              <span className={`admin-status admin-status--${subscriber.status}`}>{subscriber.status}</span>
            </div>
          ))}
          {!loading && subscribers.length === 0 && <p className="admin-empty">No subscribers yet.</p>}
        </main>
      )}
    </div>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getAdminSession().then(setSession).finally(() => setChecking(false));
  }, []);

  if (checking) return <main className="admin-login"><p>Loading…</p></main>;
  if (!session) return <Login onAuthenticated={setSession} />;

  return (
    <Dashboard
      session={session}
      onSignOut={() => {
        signOutAdmin();
        setSession(null);
      }}
    />
  );
}
