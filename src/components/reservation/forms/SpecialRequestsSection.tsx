import type { FormErrors, ReservationFormData } from '../../types/reservation';
import { TextArea } from '../FormField';

interface SpecialRequestsSectionProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function SpecialRequestsSection({
  data,
  errors,
  onChange,
  onBlur,
}: SpecialRequestsSectionProps) {
  return (
    <section className="reserve-form-panel reserve-form-panel--featured" aria-labelledby="special-requests-heading">
      <div className="reserve-form-panel__divider" aria-hidden="true" />
      <h3 id="special-requests-heading" className="reserve-section-title">
        Special Requests
      </h3>
      <TextArea
        label="Your requests"
        variant="featured"
        value={data.specialRequests}
        onChange={(e) => onChange('specialRequests', e.target.value)}
        onBlur={() => onBlur('specialRequests')}
        error={errors.specialRequests}
        placeholder="Dietary needs, celebrations, accessibility, or anything else..."
      />
      <p className="reserve-helper-text">
        Tell us how we can make your experience even more memorable.
      </p>
    </section>
  );
}
