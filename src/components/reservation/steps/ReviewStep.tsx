import { motion } from 'framer-motion';
import { EXPERIENCE_LABELS } from '../../../constants/experiences';
import type { ExperienceType, ReservationFormData } from '../../../types/reservation';
import { formatDate, formatTime } from '../../../utils/validation';

interface ReviewStepProps {
  experience: ExperienceType;
  data: ReservationFormData;
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="reserve-review-row">
      <span className="reserve-review-row__label">{label}</span>
      <span className="reserve-review-row__value">{value}</span>
    </div>
  );
}

export function ReviewStep({ experience, data }: ReviewStepProps) {
  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="reserve-step"
    >
      <div className="reserve-review-card">
        <ReviewRow label="Experience" value={EXPERIENCE_LABELS[experience]} />
        <ReviewRow label="Name" value={data.fullName} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
        <ReviewRow
          label="Date"
          value={data.preferredDate ? formatDate(data.preferredDate) : ''}
        />
        <ReviewRow
          label="Time"
          value={data.preferredTime ? formatTime(data.preferredTime) : ''}
        />
        <ReviewRow
          label="Guests"
          value={
            data.numberOfGuests
              ? `${data.numberOfGuests} guest${Number(data.numberOfGuests) !== 1 ? 's' : ''}`
              : ''
          }
        />
        {data.specialRequests && (
          <ReviewRow label="Requests" value={data.specialRequests} />
        )}
      </div>
    </motion.div>
  );
}
