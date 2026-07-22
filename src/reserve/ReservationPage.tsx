import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { ModalFooter } from '../components/reservation/ModalFooter';
import { ModalHeader } from '../components/reservation/ModalHeader';
import { ReservationSummary } from '../components/reservation/ReservationSummary';
import { SuccessState } from '../components/reservation/SuccessState';
import { DetailsStep } from '../components/reservation/steps/DetailsStep';
import { ExperienceStep } from '../components/reservation/steps/ExperienceStep';
import { ReviewStep } from '../components/reservation/steps/ReviewStep';
import { useReservationForm } from '../hooks/useReservationForm';
import { useReservationJourney } from '../hooks/useReservationJourney';
import type { ExperienceType } from '../types/reservation';
import { validateForm } from '../utils/validation';

const EXPERIENCE_TYPES: ExperienceType[] = [
  'accommodation',
  'dining',
  'activities',
  'events',
];

function readInitialExperience(): ExperienceType | null {
  const value = new URLSearchParams(window.location.search).get('experience');
  if (!value) return null;
  return EXPERIENCE_TYPES.includes(value as ExperienceType)
    ? (value as ExperienceType)
    : null;
}

function goHome(): void {
  window.location.href = '/';
}

function goBack(): void {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  goHome();
}

export function ReservationPage() {
  const titleId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const initialExperience = useMemo(() => readInitialExperience(), []);
  const { step, next, back, reset: resetJourney } = useReservationJourney(
    initialExperience ? 'details' : 'experience',
  );

  const {
    experience,
    formData,
    errors,
    submitState,
    submitError,
    selectExperience,
    updateField,
    blurField,
    resetForm,
    submit,
    setErrors,
    setTouchedAll,
  } = useReservationForm(initialExperience);

  useEffect(() => {
    document.title = 'Reserve — Leleshwa Getaway';
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, submitState]);

  const handleLeave = useCallback(() => {
    if (submitState === 'loading') return;
    goBack();
  }, [submitState]);

  const handleContinue = () => {
    if (step === 'experience') {
      if (!experience) return;
      next();
      return;
    }
    if (step === 'details') {
      setTouchedAll();
      const validationErrors = validateForm(formData, experience);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) next();
    }
  };

  const canContinue = step === 'experience' ? Boolean(experience) : true;

  return (
    <div className="reserve-page">
      <div className="reserve-page__atmosphere" aria-hidden="true" />

      <div className="reserve-page__shell">
        <nav className="reserve-page__nav" aria-label="Reservation navigation">
          <button
            type="button"
            className="reserve-page__back"
            onClick={handleLeave}
            disabled={submitState === 'loading'}
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
            Back
          </button>
          <a href="/" className="reserve-page__brand">
            <img src="/images/logo.png" alt="Leleshwa Getaway" />
          </a>
          <span className="reserve-page__crumb" aria-current="page">
            Reserve
          </span>
        </nav>

        <main className="reserve-page__main" aria-labelledby={titleId}>
          <AnimatePresence mode="wait">
            {submitState === 'success' ? (
              <motion.div
                key="success"
                className="reserve-page__panel reserve-page__panel--success"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <SuccessState
                  onReturnHome={goHome}
                  onMakeAnother={() => {
                    resetForm();
                    resetJourney();
                    const url = new URL(window.location.href);
                    url.searchParams.delete('experience');
                    window.history.replaceState({}, '', url.pathname);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="journey"
                className="reserve-page__panel"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ModalHeader titleId={titleId} step={step} />

                <div ref={bodyRef} className="reserve-body reserve-page__body">
                  <div className="reserve-body__content">
                    <AnimatePresence mode="wait">
                      {step === 'experience' && (
                        <ExperienceStep
                          selected={experience}
                          onSelect={selectExperience}
                        />
                      )}
                      {step === 'details' && experience && (
                        <DetailsStep
                          experience={experience}
                          data={formData}
                          errors={errors}
                          onChange={updateField}
                          onBlur={blurField}
                        />
                      )}
                      {step === 'review' && experience && (
                        <ReviewStep experience={experience} data={formData} />
                      )}
                    </AnimatePresence>
                  </div>

                  <aside className="reserve-body__summary">
                    <ReservationSummary
                      experience={experience}
                      data={formData}
                      step={step}
                    />
                  </aside>
                </div>

                <ModalFooter
                  step={step}
                  submitState={submitState}
                  submitError={submitError}
                  canContinue={canContinue}
                  cancelLabel="Back to site"
                  onCancel={handleLeave}
                  onBack={back}
                  onContinue={handleContinue}
                  onConfirm={() => {
                    void submit();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
