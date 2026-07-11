import { CATERING_OPTIONS, EVENT_DURATIONS } from '../../../constants/experiences';
import type { FormErrors, ReservationFormData } from '../../../types/reservation';
import { SelectInput, TextArea, TextInput } from '../FormField';

interface EventsFieldsProps {
  data: ReservationFormData;
  errors: FormErrors;
  onChange: (field: keyof ReservationFormData, value: string) => void;
  onBlur: (field: keyof ReservationFormData) => void;
}

export function EventsFields({ data, errors, onChange, onBlur }: EventsFieldsProps) {
  return (
    <div className="reserve-form-grid">
      <TextInput
        label="Event Type"
        required
        value={data.eventType}
        onChange={(e) => onChange('eventType', e.target.value)}
        onBlur={() => onBlur('eventType')}
        error={errors.eventType}
        placeholder="Conference, wedding, retreat..."
      />
      <TextInput
        label="Number of Attendees"
        required
        type="number"
        min={1}
        value={data.numberOfAttendees}
        onChange={(e) => onChange('numberOfAttendees', e.target.value)}
        onBlur={() => onBlur('numberOfAttendees')}
        error={errors.numberOfAttendees}
        placeholder="50"
      />
      <TextInput
        label="Event Date"
        required
        type="date"
        value={data.eventDate}
        onChange={(e) => onChange('eventDate', e.target.value)}
        onBlur={() => onBlur('eventDate')}
        error={errors.eventDate}
      />
      <SelectInput
        label="Event Duration"
        required
        value={data.eventDuration}
        onChange={(e) => onChange('eventDuration', e.target.value)}
        onBlur={() => onBlur('eventDuration')}
        error={errors.eventDuration}
        options={EVENT_DURATIONS}
        placeholder="Select duration"
      />
      <SelectInput
        label="Catering Required"
        required
        value={data.cateringRequired}
        onChange={(e) => onChange('cateringRequired', e.target.value)}
        onBlur={() => onBlur('cateringRequired')}
        error={errors.cateringRequired}
        options={CATERING_OPTIONS}
        placeholder="Select option"
      />
      <div className="reserve-field--full">
        <TextArea
          label="Additional Requirements"
          value={data.additionalRequirements}
          onChange={(e) => onChange('additionalRequirements', e.target.value)}
          onBlur={() => onBlur('additionalRequirements')}
          placeholder="AV equipment, seating layout, décor preferences..."
        />
      </div>
    </div>
  );
}
