import type { FormErrors, ReservationFormData } from '../../types/reservation';
import { TextInput } from '../FormField';

interface CommonFieldsProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function CommonFields({ data, errors, onChange, onBlur }: CommonFieldsProps) {
  return (
    <div className="reserve-form-grid">
      <TextInput
        label="Full Name"
        required
        value={data.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
        onBlur={() => onBlur('fullName')}
        error={errors.fullName}
        autoComplete="name"
      />
      <TextInput
        label="Email Address"
        required
        type="email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        onBlur={() => onBlur('email')}
        error={errors.email}
        autoComplete="email"
      />
      <TextInput
        label="Phone Number"
        required
        type="tel"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        onBlur={() => onBlur('phone')}
        error={errors.phone}
        autoComplete="tel"
      />
      <TextInput
        label="Preferred Date"
        required
        type="date"
        value={data.preferredDate}
        onChange={(e) => onChange('preferredDate', e.target.value)}
        onBlur={() => onBlur('preferredDate')}
        error={errors.preferredDate}
      />
      <TextInput
        label="Preferred Time"
        required
        type="time"
        value={data.preferredTime}
        onChange={(e) => onChange('preferredTime', e.target.value)}
        onBlur={() => onBlur('preferredTime')}
        error={errors.preferredTime}
      />
      <TextInput
        label="Number of Guests"
        required
        type="number"
        min={1}
        value={data.numberOfGuests}
        onChange={(e) => onChange('numberOfGuests', e.target.value)}
        onBlur={() => onBlur('numberOfGuests')}
        error={errors.numberOfGuests}
      />
    </div>
  );
}
