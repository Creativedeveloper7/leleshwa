import { Loader2 } from 'lucide-react';
import type { JourneyStep } from '../../types/journey';
import type { SubmitState } from '../../types/reservation';

interface ModalFooterProps {
  step: JourneyStep;
  submitState: SubmitState;
  canContinue: boolean;
  onCancel: () => void;
  onBack: () => void;
  onContinue: () => void;
  onConfirm: () => void;
}

export function ModalFooter({
  step,
  submitState,
  canContinue,
  onCancel,
  onBack,
  onContinue,
  onConfirm,
}: ModalFooterProps) {
  const isLoading = submitState === 'loading';

  return (
    <footer className="concierge-footer">
      <div className="reserve-cta-row">
        {step === 'experience' ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="concierge-btn-ghost"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="concierge-btn-ghost"
          >
            Back
          </button>
        )}

        {step === 'review' ? (
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="concierge-btn-primary"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm Reservation'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue || isLoading}
            className="concierge-btn-primary"
          >
            {step === 'experience' ? 'Continue' : 'Review Reservation'}
          </button>
        )}
      </div>
    </footer>
  );
}
