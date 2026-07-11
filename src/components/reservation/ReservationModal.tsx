import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useId, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useModalLayout } from '../../hooks/useModalLayout';
import { useReservationForm } from '../../hooks/useReservationForm';
import { useReservationJourney } from '../../hooks/useReservationJourney';
import type { ModalAnchor } from '../../types/modal';
import { validateForm } from '../../utils/validation';
import { CloseButton } from './CloseButton';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ReservationSummary } from './ReservationSummary';
import { SuccessState } from './SuccessState';
import { DetailsStep } from './steps/DetailsStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { ReviewStep } from './steps/ReviewStep';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: ModalAnchor | null;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
const ANIM_DURATION = 0.65;

export function ReservationModal({ isOpen, onClose, anchor }: ReservationModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const layout = useModalLayout(anchor, isOpen);
  const { step, next, back, reset: resetJourney } = useReservationJourney();

  const {
    experience,
    formData,
    errors,
    submitState,
    selectExperience,
    updateField,
    blurField,
    resetForm,
    submit,
    setErrors,
    setTouchedAll,
  } = useReservationForm();

  useFocusTrap(modalRef, isOpen && submitState !== 'success');

  const handleClose = useCallback(() => {
    if (submitState === 'loading') return;
    onClose();
    window.setTimeout(() => {
      resetForm();
      resetJourney();
    }, 400);
  }, [onClose, resetForm, resetJourney, submitState]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen && layout && modalRef.current) modalRef.current.focus();
  }, [isOpen, layout, submitState]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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

  const handleConfirm = async () => {
    await submit();
  };

  const isMobile = layout?.isMobile ?? false;

  const panelStyle = layout
    ? {
        top: layout.top,
        left: layout.left,
        width: layout.width,
        height: layout.height,
        maxHeight: layout.maxHeight,
        transformOrigin: layout.transformOrigin,
        borderRadius: layout.borderRadius,
      }
    : undefined;

  const canContinue = step === 'experience' ? Boolean(experience) : true;

  return (
    <AnimatePresence>
      {isOpen && layout && (
        <div className="fixed inset-0 z-[10000]" role="presentation">
          <motion.div
            className="concierge-backdrop concierge-backdrop-vignette absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {anchor && !isMobile && (
            <motion.span
              aria-hidden="true"
              className="concierge-anchor-pulse"
              style={{
                left: anchor.left,
                top: anchor.top,
                width: anchor.width,
                height: anchor.height,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
            />
          )}

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            layout
            className="concierge-panel fixed z-[10002]"
            style={panelStyle}
            initial={
              isMobile
                ? { y: '100%', opacity: 0.9 }
                : { scale: 0.05, opacity: 0, borderRadius: 999 }
            }
            animate={
              isMobile
                ? { y: 0, opacity: 1, borderRadius: 0 }
                : { scale: 1, opacity: 1, borderRadius: layout.borderRadius }
            }
            exit={
              isMobile
                ? { y: '100%', opacity: 0.9 }
                : { scale: 0.08, opacity: 0, borderRadius: 999 }
            }
            transition={{ duration: ANIM_DURATION, ease: LUXURY_EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4 z-30 sm:right-5 sm:top-5">
              <CloseButton onClick={handleClose} disabled={submitState === 'loading'} />
            </div>

            <AnimatePresence mode="wait">
              {submitState === 'success' ? (
                <motion.div key="success" className="relative z-[2] flex min-h-0 flex-1 flex-col">
                  <SuccessState
                    onReturnHome={() => {
                      handleClose();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onMakeAnother={() => {
                      resetForm();
                      resetJourney();
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="journey"
                  className="relative z-[2] flex min-h-0 flex-1 flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ModalHeader titleId={titleId} step={step} />

                  <div ref={bodyRef} className="reserve-body">
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

                    <div className="reserve-body__summary">
                      <ReservationSummary experience={experience} data={formData} step={step} />
                    </div>
                  </div>

                  <ModalFooter
                    step={step}
                    submitState={submitState}
                    canContinue={canContinue}
                    onCancel={handleClose}
                    onBack={back}
                    onContinue={handleContinue}
                    onConfirm={handleConfirm}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
