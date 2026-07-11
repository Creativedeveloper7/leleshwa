import type { JourneyStep } from '../../types/journey';
import { JourneyProgress } from './JourneyProgress';

interface ModalHeaderProps {
  titleId: string;
  step: JourneyStep;
}

const STEP_COPY: Record<JourneyStep, { title: string; subtitle: string }> = {
  experience: {
    title: 'What Would You Like To Experience?',
    subtitle: 'Reserve a curated experience tailored to your journey.',
  },
  details: {
    title: 'Tell Us About Your Stay',
    subtitle: 'Complete the details below — our concierge team handles the rest.',
  },
  review: {
    title: 'Review & Confirm',
    subtitle: 'Verify your reservation before submitting to our concierge.',
  },
};

export function ModalHeader({ titleId, step }: ModalHeaderProps) {
  const copy = STEP_COPY[step];

  return (
    <header className={`reserve-header ${step === 'experience' ? 'reserve-header--experience' : ''}`}>
      <JourneyProgress current={step} />

      <div className="reserve-header__brand">
        <img
          src="/images/logo.png"
          alt="Leleshwa Getaway"
          className="reserve-header__logo"
        />
        <h2 id={titleId} className="reserve-title">
          {copy.title}
        </h2>
        <p className="reserve-subtitle">{copy.subtitle}</p>
      </div>
    </header>
  );
}
