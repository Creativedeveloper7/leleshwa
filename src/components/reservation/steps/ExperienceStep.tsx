import { motion } from 'framer-motion';
import type { ExperienceType } from '../../types/reservation';
import { ExperienceCards } from '../ExperienceCards';

interface ExperienceStepProps {
  selected: ExperienceType | null;
  onSelect: (id: ExperienceType) => void;
}

export function ExperienceStep({ selected, onSelect }: ExperienceStepProps) {
  return (
    <motion.section
      key="experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="reserve-experience-section"
      aria-label="Choose your experience"
    >
      <ExperienceCards selected={selected} onSelect={onSelect} />
    </motion.section>
  );
}
