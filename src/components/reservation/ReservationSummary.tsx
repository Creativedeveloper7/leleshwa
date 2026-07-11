import { EXPERIENCE_LABELS } from '../../constants/experiences';
import type { JourneyStep } from '../../types/journey';
import type { ExperienceType, ReservationFormData } from '../../types/reservation';
import { formatDate } from '../../utils/validation';

interface LedgerRow {
  label: string;
  value: string;
}

interface ReservationSummaryProps {
  experience: ExperienceType | null;
  data: ReservationFormData;
  step: JourneyStep;
}

function detailLabel(experience: ExperienceType | null): string {
  if (!experience) return 'Room';
  if (experience === 'accommodation') return 'Room';
  if (experience === 'dining') return 'Dining';
  if (experience === 'activities') return 'Activity';
  return 'Event';
}

function buildRows(
  experience: ExperienceType | null,
  data: ReservationFormData,
): LedgerRow[] {
  const experienceLabel = experience ? EXPERIENCE_LABELS[experience] : '';

  const detailValue =
    experience === 'accommodation'
      ? data.roomType
      : experience === 'dining'
        ? data.diningExperience
        : experience === 'activities'
          ? data.activityType
          : experience === 'events'
            ? data.eventType
            : '';

  let guestCount = '';
  if (experience === 'accommodation' && data.adults) {
    guestCount = `${data.adults} adult${Number(data.adults) !== 1 ? 's' : ''}`;
    if (data.children) {
      guestCount += `, ${data.children} child${Number(data.children) !== 1 ? 'ren' : ''}`;
    }
  } else if (data.numberOfGuests) {
    guestCount = `${data.numberOfGuests} guest${Number(data.numberOfGuests) !== 1 ? 's' : ''}`;
  } else if (experience === 'activities' && data.participants) {
    guestCount = `${data.participants} participant${Number(data.participants) !== 1 ? 's' : ''}`;
  } else if (experience === 'events' && data.numberOfAttendees) {
    guestCount = `${data.numberOfAttendees} attendee${Number(data.numberOfAttendees) !== 1 ? 's' : ''}`;
  }

  const displayDate =
    experience === 'accommodation' && data.checkInDate
      ? `${formatDate(data.checkInDate)}${data.checkOutDate ? ` → ${formatDate(data.checkOutDate)}` : ''}`
      : experience === 'events' && data.eventDate
        ? formatDate(data.eventDate)
        : data.preferredDate
          ? formatDate(data.preferredDate)
          : '';

  const requests =
    data.specialRequests || data.dietaryRequirements || data.additionalRequirements || '';

  return [
    { label: 'Experience', value: experienceLabel },
    { label: 'Date', value: displayDate },
    { label: 'Guests', value: guestCount },
    { label: detailLabel(experience), value: detailValue },
    { label: 'Requests', value: requests },
  ];
}

const STEP_NUMBER: Record<JourneyStep, number> = {
  experience: 1,
  details: 2,
  review: 3,
};

export function ReservationSummary({ experience, data, step }: ReservationSummaryProps) {
  const rows = buildRows(experience, data);

  return (
    <section className="reserve-ledger-wrap" aria-label="Reservation summary">
      <div className="reserve-ledger-meta">
        <span className="reserve-ledger-meta__title">Your Reservation</span>
        <span className="reserve-ledger-meta__step">step {STEP_NUMBER[step]} of 3</span>
      </div>

      <div className="reserve-ledger" role="table">
        <div className="reserve-ledger__body" role="rowgroup">
          {rows.map((row, index) => (
            <div
              key={row.label}
              role="row"
              className={`reserve-ledger__row ${index % 2 === 1 ? 'reserve-ledger__row--alt' : ''}`}
            >
              <span className="reserve-ledger__label" role="rowheader">
                {row.label}
              </span>
              <span className="reserve-ledger__value" role="cell">
                {row.value ? (
                  <span className="reserve-ledger__filled">{row.value}</span>
                ) : (
                  <span className="reserve-ledger__empty">Not selected yet</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
