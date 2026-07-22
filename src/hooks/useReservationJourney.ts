import { useCallback, useState } from 'react';
import type { JourneyStep } from '../types/journey';

export function useReservationJourney(initialStep: JourneyStep = 'experience') {
  const [step, setStep] = useState<JourneyStep>(initialStep);

  const goTo = useCallback((next: JourneyStep) => setStep(next), []);

  const next = useCallback(() => {
    setStep((current) => {
      if (current === 'experience') return 'details';
      if (current === 'details') return 'review';
      return current;
    });
  }, []);

  const back = useCallback(() => {
    setStep((current) => {
      if (current === 'review') return 'details';
      if (current === 'details') return 'experience';
      return current;
    });
  }, []);

  const reset = useCallback(() => setStep('experience'), []);

  return { step, goTo, next, back, reset };
}
