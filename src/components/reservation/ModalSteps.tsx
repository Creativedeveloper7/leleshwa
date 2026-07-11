import { Check } from 'lucide-react';
import type { ExperienceType } from '../../types/reservation';

interface ModalStepsProps {
  experience: ExperienceType | null;
  isLoading?: boolean;
}

const STEPS = [
  { id: 1, label: 'Experience' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Confirm' },
];

export function ModalSteps({ experience, isLoading = false }: ModalStepsProps) {
  const currentStep = isLoading ? 3 : !experience ? 1 : 2;

  return (
    <div className="lg-steps" aria-label="Reservation progress">
      {STEPS.map((step, i) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;

        return (
          <div key={step.id} className="lg-step">
            {i > 0 && <div className="lg-step-line" />}
            <div
              className={`lg-step-dot ${
                isDone ? 'lg-step-dot--done' : isActive ? 'lg-step-dot--active' : 'lg-step-dot--idle'
              }`}
            >
              {isDone ? <Check size={11} strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`lg-step-label ${isActive ? 'lg-step-label--active' : ''}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
