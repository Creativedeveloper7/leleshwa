import { motion } from 'framer-motion';
import type { ExperienceType, FormErrors, ReservationFormData } from '../../../types/reservation';
import { DynamicBookingForm } from '../DynamicBookingForm';

interface DetailsStepProps {
  experience: ExperienceType;
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function DetailsStep({ experience, data, errors, onChange, onBlur }: DetailsStepProps) {
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="reserve-step"
    >
      <DynamicBookingForm
        experience={experience}
        data={data}
        errors={errors}
        onChange={onChange}
        onBlur={onBlur}
      />
    </motion.div>
  );
}
