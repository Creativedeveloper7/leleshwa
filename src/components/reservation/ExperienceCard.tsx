import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ExperienceOption } from '../../types/experience';

interface ExperienceCardProps {
  experience: ExperienceOption;
  selected: boolean;
  onSelect: () => void;
  index: number;
}

export function ExperienceCard({ experience, selected, onSelect, index }: ExperienceCardProps) {
  const Icon = experience.icon;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={selected}
      className={`reserve-dest-card ${selected ? 'reserve-dest-card--selected' : ''}`}
    >
      <span
        className="reserve-dest-card__bg"
        style={{ backgroundImage: `url('${experience.image}')` }}
        aria-hidden="true"
      />
      <span className="reserve-dest-card__overlay" aria-hidden="true" />

      {selected && (
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="reserve-dest-card__badge"
        >
          <Check size={12} strokeWidth={3} aria-hidden="true" />
          Selected
        </motion.span>
      )}

      <span className="reserve-dest-card__content">
        <span className="reserve-dest-card__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.5} />
        </span>
        <span className="reserve-dest-card__label">{experience.luxuryLabel}</span>
        <span className="reserve-dest-card__title">{experience.title}</span>
        <span className="reserve-dest-card__desc">{experience.description}</span>
      </span>
    </motion.button>
  );
}
