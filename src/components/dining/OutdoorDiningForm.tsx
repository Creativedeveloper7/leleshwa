import { useState } from 'react';
import { OUTDOOR_DINING_LOCATIONS } from '../../constants/diningVenues';
import type {
  OutdoorDiningFormData,
  OutdoorDiningFormErrors,
  OutdoorDiningType,
} from '../../types/diningVenue';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../reservation/FormField';

interface OutdoorDiningFormProps {
  onBack: () => void;
}

const INITIAL_FORM: OutdoorDiningFormData = {
  diningType: 'tailor-made-meal',
  preferredDate: '',
  preferredTime: '',
  guestCount: '',
  locationPreference: '',
  dietaryRestrictions: '',
  specialRequests: '',
  guestName: '',
  contact: '',
};

function validate(data: OutdoorDiningFormData): OutdoorDiningFormErrors {
  const errors: OutdoorDiningFormErrors = {};

  if (!data.preferredDate.trim()) errors.preferredDate = 'Preferred date is required';
  if (!data.preferredTime.trim()) errors.preferredTime = 'Preferred time is required';
  if (!data.guestCount.trim()) {
    errors.guestCount = 'Number of guests is required';
  } else if (Number(data.guestCount) < 1) {
    errors.guestCount = 'Enter at least one guest';
  }
  if (!data.guestName.trim()) errors.guestName = 'Guest name is required';
  if (!data.contact.trim()) errors.contact = 'Contact number or email is required';

  return errors;
}

export function OutdoorDiningForm({ onBack }: OutdoorDiningFormProps) {
  const [form, setForm] = useState<OutdoorDiningFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<OutdoorDiningFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof OutdoorDiningFormData>(field: K, value: OutdoorDiningFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setDiningType = (type: OutdoorDiningType) => {
    setField('diningType', type);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log('Outdoor dining request:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <article className="acc-detail">
        <button type="button" className="acc-detail-back" onClick={onBack}>
          ← Back to dining
        </button>
        <h3 className="acc-detail-title">Request Received</h3>
        <p className="acc-detail-desc">
          Request received — our concierge will confirm shortly.
        </p>
        <button type="button" className="btn-reserve acc-detail-cta" onClick={onBack}>
          Back to Dining
        </button>
      </article>
    );
  }

  return (
    <article className="acc-detail">
      <button type="button" className="acc-detail-back" onClick={onBack}>
        ← Back to dining
      </button>

      <h3 className="acc-detail-title">Request Outdoor Dining</h3>
      <p className="acc-detail-tagline">Tell us how you would like to dine beneath the sky.</p>

      <div className="dining-form-tabs" role="tablist" aria-label="Outdoor dining type">
        <button
          type="button"
          role="tab"
          aria-selected={form.diningType === 'tailor-made-meal'}
          className={`dining-form-tab concierge-btn-ghost${form.diningType === 'tailor-made-meal' ? ' dining-form-tab--active' : ''}`}
          onClick={() => setDiningType('tailor-made-meal')}
        >
          Tailor-made meal
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={form.diningType === 'picnic-setting'}
          className={`dining-form-tab concierge-btn-ghost${form.diningType === 'picnic-setting' ? ' dining-form-tab--active' : ''}`}
          onClick={() => setDiningType('picnic-setting')}
        >
          Picnic setting
        </button>
      </div>

      <input type="hidden" name="diningType" value={form.diningType} />

      <form className="reserve-form-flow" onSubmit={handleSubmit} noValidate>
        <div className="reserve-form-grid">
          <FloatingInput
            label="Preferred date"
            type="date"
            required
            value={form.preferredDate}
            onChange={(event) => setField('preferredDate', event.target.value)}
            error={errors.preferredDate}
          />
          <FloatingInput
            label="Preferred time"
            type="time"
            required
            value={form.preferredTime}
            onChange={(event) => setField('preferredTime', event.target.value)}
            error={errors.preferredTime}
          />
          <FloatingInput
            label="Number of guests"
            type="number"
            min={1}
            required
            value={form.guestCount}
            onChange={(event) => setField('guestCount', event.target.value)}
            error={errors.guestCount}
          />
          <FloatingSelect
            label="Location preference"
            value={form.locationPreference}
            onChange={(event) => setField('locationPreference', event.target.value)}
            options={OUTDOOR_DINING_LOCATIONS}
            placeholder="Select location"
          />
          <FloatingInput
            label="Guest name"
            required
            value={form.guestName}
            onChange={(event) => setField('guestName', event.target.value)}
            error={errors.guestName}
          />
          <FloatingInput
            label="Contact number or email"
            required
            value={form.contact}
            onChange={(event) => setField('contact', event.target.value)}
            error={errors.contact}
          />
          <div className="reserve-field--full">
            <FloatingInput
              label="Dietary restrictions or allergies"
              value={form.dietaryRestrictions}
              onChange={(event) => setField('dietaryRestrictions', event.target.value)}
            />
          </div>
          <div className="reserve-field--full">
            <FloatingTextarea
              label="Special requests"
              value={form.specialRequests}
              onChange={(event) => setField('specialRequests', event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="concierge-btn-primary acc-detail-cta">
          Submit Request
        </button>
      </form>
    </article>
  );
}
