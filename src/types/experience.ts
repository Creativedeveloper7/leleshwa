import type { LucideIcon } from 'lucide-react';
import type { ExperienceType } from './reservation';

export interface ExperienceOption {
  id: ExperienceType;
  title: string;
  description: string;
  luxuryLabel: string;
  image: string;
  icon: LucideIcon;
}
