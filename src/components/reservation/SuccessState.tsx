import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessStateProps {
  onReturnHome: () => void;
  onMakeAnother: () => void;
}

export function SuccessState({ onReturnHome, onMakeAnother }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="reserve-success"
    >
      <div
        className="reserve-success__bg"
        style={{ backgroundImage: "url('/images/sunset.png')" }}
        aria-hidden="true"
      />
      <div className="reserve-success__overlay" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 18 }}
        className="reserve-success__icon"
      >
        <CheckCircle2 size={44} strokeWidth={1.5} />
      </motion.div>

      <h2 className="reserve-success__title">Reservation Received</h2>
      <p className="reserve-success__text">
        Thank you for choosing Leleshwa Getaway. Our concierge team will contact you
        shortly to confirm your experience.
      </p>

      <div className="reserve-success__cta">
        <button type="button" onClick={onReturnHome} className="reserve-success__btn-primary">
          Return Home
        </button>
        <button type="button" onClick={onMakeAnother} className="reserve-success__btn-ghost">
          Make Another Reservation
        </button>
      </div>
    </motion.div>
  );
}

export { SuccessState as SuccessScreen };
