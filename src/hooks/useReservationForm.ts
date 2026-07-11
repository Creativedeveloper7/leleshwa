import { useCallback, useEffect, useState } from 'react';
import type {
  ExperienceType,
  FormErrors,
  FormFieldKey,
  ReservationFormData,
  SubmitState,
} from '../types/reservation';
import { INITIAL_FORM_DATA } from '../types/reservation';
import { validateField, validateForm } from '../utils/validation';

export function useReservationForm() {
  const [experience, setExperience] = useState<ExperienceType | null>(null);
  const [formData, setFormData] = useState<ReservationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const updateField = useCallback(
    (field: FormFieldKey, value: string) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };
        if (touched[field]) {
          const error = validateField(field, value, next, experience);
          setErrors((e) => ({ ...e, [field]: error }));
        }
        return next;
      });
    },
    [experience, touched],
  );

  const blurField = useCallback(
    (field: FormFieldKey) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, formData[field], formData, experience),
      }));
    },
    [experience, formData],
  );

  const selectExperience = useCallback((id: ExperienceType) => {
    setExperience(id);
    setErrors({});
    setTouched({});
  }, []);

  const resetForm = useCallback(() => {
    setExperience(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
    setSubmitState('idle');
  }, []);

  const submit = useCallback(async () => {
    const allTouched = Object.fromEntries(
      Object.keys(formData).map((k) => [k, true]),
    ) as Partial<Record<FormFieldKey, boolean>>;
    setTouched(allTouched);

    const validationErrors = validateForm(formData, experience);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return false;

    setSubmitState('loading');
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setSubmitState('success');
    return true;
  }, [experience, formData]);

  const setTouchedAll = useCallback(() => {
    const allTouched = Object.fromEntries(
      Object.keys(INITIAL_FORM_DATA).map((k) => [k, true]),
    ) as Partial<Record<FormFieldKey, boolean>>;
    setTouched(allTouched);
  }, []);

  const setErrorsDirect = useCallback((next: FormErrors) => {
    setErrors(next);
  }, []);

  return {
    experience,
    formData,
    errors,
    submitState,
    selectExperience,
    updateField,
    blurField,
    resetForm,
    submit,
    setErrors: setErrorsDirect,
    setTouchedAll,
  };
}
