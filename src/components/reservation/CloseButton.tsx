import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function CloseButton({ onClick, disabled }: CloseButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Close reservation"
      className="concierge-close"
      whileTap={{ scale: 0.92 }}
    >
      <X size={18} strokeWidth={1.5} />
    </motion.button>
  );
}
