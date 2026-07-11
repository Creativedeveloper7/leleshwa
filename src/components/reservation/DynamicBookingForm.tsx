import { AnimatePresence, motion } from 'framer-motion';
import type { ExperienceType, FormErrors, ReservationFormData } from '../../types/reservation';
import { AccommodationFields } from './forms/AccommodationFields';
import { ActivitiesFields } from './forms/ActivitiesFields';
import { CommonFields } from './forms/CommonFields';
import { DiningFields } from './forms/DiningFields';
import { EventsFields } from './forms/EventsFields';
import { SpecialRequestsSection } from './forms/SpecialRequestsSection';

interface DynamicBookingFormProps {
  experience: ExperienceType;
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

const SECTION_LABELS: Record<ExperienceType, string> = {
  accommodation: 'Reservation Details',
  dining: 'Dining Preferences',
  activities: 'Activity Details',
  events: 'Event Details',
};

const formVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

function ExperienceFields(props: DynamicBookingFormProps) {
  switch (props.experience) {
    case 'accommodation':
      return <AccommodationFields {...props} />;
    case 'dining':
      return <DiningFields {...props} />;
    case 'activities':
      return <ActivitiesFields {...props} />;
    case 'events':
      return <EventsFields {...props} />;
  }
}

export function DynamicBookingForm({
  experience,
  data,
  errors,
  onChange,
  onBlur,
}: DynamicBookingFormProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={experience}
        variants={formVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="reserve-form-flow"
      >
        <section className="reserve-form-panel" aria-labelledby="guest-info-heading">
          <h3 id="guest-info-heading" className="reserve-section-title">
            Guest Information
          </h3>
          <CommonFields data={data} errors={errors} onChange={onChange} onBlur={onBlur} />
        </section>

        <section className="reserve-form-panel" aria-labelledby="experience-details-heading">
          <div className="reserve-form-panel__divider" aria-hidden="true" />
          <h3 id="experience-details-heading" className="reserve-section-title">
            {SECTION_LABELS[experience]}
          </h3>
          <ExperienceFields
            experience={experience}
            data={data}
            errors={errors}
            onChange={onChange}
            onBlur={onBlur}
          />
        </section>

        <SpecialRequestsSection
          data={data}
          errors={errors}
          onChange={onChange}
          onBlur={onBlur}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export { DynamicBookingForm as BookingForm };
