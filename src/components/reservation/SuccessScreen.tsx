import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessScreenProps {
  onReturnHome: () => void;
  onMakeAnother: () => void;
}

export function SuccessScreen({ onReturnHome, onMakeAnother }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative flex flex-col items-center overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(215,166,74,0.12), transparent 55%)',
        }}
      />

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 18 }}
        className="lg-success-icon relative"
      >
        <CheckCircle2 size={42} className="text-gold" strokeWidth={1.5} />
      </motion.div>

      <h2 className="relative font-display text-2xl uppercase leading-[0.92] text-earth sm:text-3xl">
        Thank You For Choosing
        <br />
        <span className="text-gold">Leleshwa Getaway</span>
      </h2>
      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-charcoal/65 sm:text-[15px]">
        Your reservation request has been received. Our team will contact you shortly
        to confirm your experience.
      </p>

      <div className="relative mt-9 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={onReturnHome} className="lg-btn-primary">
          Return Home
        </button>
        <button type="button" onClick={onMakeAnother} className="lg-btn-outline">
          Make Another Reservation
        </button>
      </div>
    </motion.div>
  );
}
