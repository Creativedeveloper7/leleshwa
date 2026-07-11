import type {
  ExperienceType,
  FormErrors,
  FormFieldKey,
  ReservationFormData,
} from '../types/reservation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{8,20}$/;

function isPastDate(value: string): boolean {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isCheckOutBeforeCheckIn(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  return new Date(checkOut) <= new Date(checkIn);
}

function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

export function validateField(
  field: FormFieldKey,
  value: string,
  data: ReservationFormData,
  experience: ExperienceType | null,
): string | undefined {
  switch (field) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Please enter your full name';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address';
      return undefined;
    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      if (!PHONE_RE.test(value.trim())) return 'Please enter a valid phone number';
      return undefined;
    case 'preferredDate':
      if (!value) return 'Preferred date is required';
      if (isPastDate(value)) return 'Date cannot be in the past';
      return undefined;
    case 'preferredTime':
      if (!value) return 'Preferred time is required';
      return undefined;
    case 'numberOfGuests':
      if (!value) return 'Number of guests is required';
      if (Number(value) < 1) return 'At least 1 guest is required';
      return undefined;
    case 'checkInDate':
      if (experience !== 'accommodation') return undefined;
      if (!value) return 'Check-in date is required';
      if (isPastDate(value)) return 'Check-in cannot be in the past';
      return undefined;
    case 'checkOutDate':
      if (experience !== 'accommodation') return undefined;
      if (!value) return 'Check-out date is required';
      if (isCheckOutBeforeCheckIn(data.checkInDate, value))
        return 'Check-out must be after check-in';
      return undefined;
    case 'adults':
      if (experience !== 'accommodation') return undefined;
      if (!value) return 'Number of adults is required';
      if (Number(value) < 1) return 'At least 1 adult is required';
      return undefined;
    case 'children':
      if (experience !== 'accommodation') return undefined;
      if (value && Number(value) < 0) return 'Invalid number of children';
      return undefined;
    case 'roomType':
      if (experience !== 'accommodation') return undefined;
      return validateRequired(value, 'Room type');
    case 'diningExperience':
      if (experience !== 'dining') return undefined;
      return validateRequired(value, 'Dining experience');
    case 'dietaryRequirements':
      return undefined;
    case 'activityType':
      if (experience !== 'activities') return undefined;
      return validateRequired(value, 'Activity type');
    case 'participants':
      if (experience !== 'activities') return undefined;
      if (!value) return 'Number of participants is required';
      if (Number(value) < 1) return 'At least 1 participant is required';
      return undefined;
    case 'eventType':
      if (experience !== 'events') return undefined;
      return validateRequired(value, 'Event type');
    case 'numberOfAttendees':
      if (experience !== 'events') return undefined;
      if (!value) return 'Number of attendees is required';
      if (Number(value) < 1) return 'At least 1 attendee is required';
      return undefined;
    case 'eventDate':
      if (experience !== 'events') return undefined;
      if (!value) return 'Event date is required';
      if (isPastDate(value)) return 'Event date cannot be in the past';
      return undefined;
    case 'eventDuration':
      if (experience !== 'events') return undefined;
      return validateRequired(value, 'Event duration');
    case 'cateringRequired':
      if (experience !== 'events') return undefined;
      return validateRequired(value, 'Catering preference');
  }

  return undefined;
}

const COMMON_FIELDS: FormFieldKey[] = [
  'fullName',
  'email',
  'phone',
  'preferredDate',
  'preferredTime',
  'numberOfGuests',
];

const EXPERIENCE_FIELDS: Record<ExperienceType, FormFieldKey[]> = {
  accommodation: ['checkInDate', 'checkOutDate', 'adults', 'children', 'roomType'],
  dining: ['diningExperience'],
  activities: ['activityType', 'participants'],
  events: [
    'eventType',
    'numberOfAttendees',
    'eventDate',
    'eventDuration',
    'cateringRequired',
  ],
};

export function getFieldsForExperience(
  experience: ExperienceType | null,
): FormFieldKey[] {
  if (!experience) return [];
  return [...COMMON_FIELDS, ...EXPERIENCE_FIELDS[experience]];
}

export function validateForm(
  data: ReservationFormData,
  experience: ExperienceType | null,
): FormErrors {
  if (!experience) return {};

  const errors: FormErrors = {};
  for (const field of getFieldsForExperience(experience)) {
    const error = validateField(field, data[field], data, experience);
    if (error) errors[field] = error;
  }
  return errors;
}

export function formatDate(value: string): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(value: string): string {
  if (!value) return '';
  const [hours, minutes] = value.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
