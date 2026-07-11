import { DINING_OPTIONS } from '../../../constants/experiences';
import type { FormErrors, ReservationFormData } from '../../../types/reservation';
import { SelectInput, TextArea } from '../FormField';

interface DiningFieldsProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function DiningFields({ data, errors, onChange, onBlur }: DiningFieldsProps) {
  return (
    <div className="reserve-form-grid">
      <SelectInput
        label="Dining Experience"
        required
        value={data.diningExperience}
        onChange={(e) => onChange('diningExperience', e.target.value)}
        onBlur={() => onBlur('diningExperience')}
        error={errors.diningExperience}
        options={DINING_OPTIONS}
        placeholder="Select dining experience"
      />
      <TextArea
        label="Dietary Requirements"
        value={data.dietaryRequirements}
        onChange={(e) => onChange('dietaryRequirements', e.target.value)}
        onBlur={() => onBlur('dietaryRequirements')}
        placeholder="Allergies, vegetarian, halal, etc."
      />
    </div>
  );
}
