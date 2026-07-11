import { ROOM_TYPES } from '../../../constants/experiences';
import type { FormErrors, ReservationFormData } from '../../../types/reservation';
import { SelectInput, TextInput } from '../FormField';

interface AccommodationFieldsProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function AccommodationFields({
  data,
  errors,
  onChange,
  onBlur,
}: AccommodationFieldsProps) {
  return (
    <div className="reserve-form-grid">
      <TextInput
        label="Check-in Date"
        required
        type="date"
        value={data.checkInDate}
        onChange={(e) => onChange('checkInDate', e.target.value)}
        onBlur={() => onBlur('checkInDate')}
        error={errors.checkInDate}
      />
      <TextInput
        label="Check-out Date"
        required
        type="date"
        value={data.checkOutDate}
        onChange={(e) => onChange('checkOutDate', e.target.value)}
        onBlur={() => onBlur('checkOutDate')}
        error={errors.checkOutDate}
      />
      <TextInput
        label="Adults"
        required
        type="number"
        min={1}
        value={data.adults}
        onChange={(e) => onChange('adults', e.target.value)}
        onBlur={() => onBlur('adults')}
        error={errors.adults}
        placeholder="2"
      />
      <TextInput
        label="Children"
        type="number"
        min={0}
        value={data.children}
        onChange={(e) => onChange('children', e.target.value)}
        onBlur={() => onBlur('children')}
        error={errors.children}
        placeholder="0"
      />
      <div className="reserve-field--full">
        <SelectInput
          label="Room Type"
          required
          value={data.roomType}
          onChange={(e) => onChange('roomType', e.target.value)}
          onBlur={() => onBlur('roomType')}
          error={errors.roomType}
          options={ROOM_TYPES}
          placeholder="Select room type"
        />
      </div>
    </div>
  );
}
