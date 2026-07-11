export type ExperienceType =
  | 'accommodation'
  | 'dining'
  | 'activities'
  | 'events';

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  numberOfGuests: string;
  specialRequests: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
  roomType: string;
  diningExperience: string;
  dietaryRequirements: string;
  activityType: string;
  participants: string;
  eventType: string;
  numberOfAttendees: string;
  eventDate: string;
  eventDuration: string;
  cateringRequired: string;
  additionalRequirements: string;
}

export type FormFieldKey = keyof ReservationFormData;

export type FormErrors = Partial<Record<FormFieldKey, string>>;

export type SubmitState = 'idle' | 'loading' | 'success';

export const INITIAL_FORM_DATA: ReservationFormData = {
  fullName: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  numberOfGuests: '',
  specialRequests: '',
  checkInDate: '',
  checkOutDate: '',
  adults: '',
  children: '',
  roomType: '',
  diningExperience: '',
  dietaryRequirements: '',
  activityType: '',
  participants: '',
  eventType: '',
  numberOfAttendees: '',
  eventDate: '',
  eventDuration: '',
  cateringRequired: '',
  additionalRequirements: '',
};
