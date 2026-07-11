import type { ExperienceType } from '../types/reservation';
import type { LucideIcon } from 'lucide-react';
import { BedDouble, CalendarDays, Compass, UtensilsCrossed } from 'lucide-react';

export const EXPERIENCES: {
  id: ExperienceType;
  title: string;
  description: string;
  luxuryLabel: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    id: 'accommodation',
    title: 'Accommodation',
    description: 'Luxury cottages and suites overlooking the wilderness.',
    luxuryLabel: 'Luxury Stays',
    image: '/images/villa.png',
    icon: BedDouble,
  },
  {
    id: 'dining',
    title: 'Dining',
    description: 'Fine dining with sunset views and curated menus.',
    luxuryLabel: 'Culinary Experience',
    image: '/images/sunset.png',
    icon: UtensilsCrossed,
  },
  {
    id: 'activities',
    title: 'Activities',
    description: 'Nature trails, archery, and outdoor adventures.',
    luxuryLabel: 'Outdoor Adventures',
    image: '/images/naturewalk.png',
    icon: Compass,
  },
  {
    id: 'events',
    title: 'Events & Conferences',
    description: 'Elegant venues for gatherings above the landscape.',
    luxuryLabel: 'Premium Venues',
    image: '/images/main%20house.png',
    icon: CalendarDays,
  },
];

export const TRUST_INDICATORS = [
  'Scenic Cliff Views',
  'Family Friendly',
  '25km From Nairobi',
  'Sunset Experiences',
];

export const ROOM_TYPES = [
  'Safari Suite',
  'Luxury Villa',
  'Family Cottage',
  'Garden Room',
  'Presidential Suite',
];

export const DINING_OPTIONS = [
  'Indoor Dining',
  'Outdoor Terrace',
  'Sunset Dining',
  'Private Dining',
];

export const ACTIVITY_OPTIONS = [
  'Nature Walk',
  'Archery',
  'Team Building',
  'Family Activities',
  'Bird Watching',
  'Guided Experience',
];

export const EVENT_DURATIONS = [
  'Half Day (4 hours)',
  'Full Day (8 hours)',
  '2 Days',
  '3+ Days',
];

export const CATERING_OPTIONS = ['Yes', 'No', 'To be discussed'];

export const EXPERIENCE_LABELS: Record<string, string> = {
  accommodation: 'Accommodation',
  dining: 'Dining',
  activities: 'Activities',
  events: 'Events & Conferences',
};
