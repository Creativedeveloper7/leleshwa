export type DiningViewType = 'menu' | 'form';

export interface DiningVenue {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  viewType: DiningViewType;
  menuImages?: string[];
}

export type OutdoorDiningType = 'tailor-made-meal' | 'picnic-setting';

export interface OutdoorDiningFormData {
  diningType: OutdoorDiningType;
  preferredDate: string;
  preferredTime: string;
  guestCount: string;
  locationPreference: string;
  dietaryRestrictions: string;
  specialRequests: string;
  guestName: string;
  contact: string;
}

export type OutdoorDiningFormErrors = Partial<Record<keyof OutdoorDiningFormData, string>>;
