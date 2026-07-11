export type JourneyStep = 'experience' | 'details' | 'review';

export const JOURNEY_STEPS: { id: JourneyStep; label: string; description: string }[] = [
  { id: 'experience', label: 'Experience', description: 'Choose your journey' },
  { id: 'details', label: 'Details', description: 'Tell us about you' },
  { id: 'review', label: 'Confirm', description: 'Review & reserve' },
];
