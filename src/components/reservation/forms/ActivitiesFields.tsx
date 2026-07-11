import { ACTIVITY_OPTIONS } from '../../../constants/experiences';
import type { FormErrors, ReservationFormData } from '../../../types/reservation';
import { SelectInput, TextInput } from '../FormField';

interface ActivitiesFieldsProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function ActivitiesFields({
  data,
  errors,
  onChange,
  onBlur,
}: ActivitiesFieldsProps) {
  return (
    <div className="reserve-form-grid">
      <div className="reserve-field--full">
        <SelectInput
          label="Activity Type"
          required
          value={data.activityType}
          onChange={(e) => onChange('activityType', e.target.value)}
          onBlur={() => onBlur('activityType')}
          error={errors.activityType}
          options={ACTIVITY_OPTIONS}
          placeholder="Select activity"
        />
      </div>
      <TextInput
        label="Participants"
        required
        type="number"
        min={1}
        value={data.participants}
        onChange={(e) => onChange('participants', e.target.value)}
        onBlur={() => onBlur('participants')}
        error={errors.participants}
        placeholder="4"
      />
    </div>
  );
}
