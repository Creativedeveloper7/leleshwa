import { JOURNEY_STEPS, type JourneyStep } from '../../types/journey';

interface JourneyProgressProps {
  current: JourneyStep;
}

export function JourneyProgress({ current }: JourneyProgressProps) {
  const currentIndex = JOURNEY_STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Reservation progress" className="reserve-progress">
      <ol className="reserve-progress__track">
        {JOURNEY_STEPS.map((item, index) => {
          const isComplete = index < currentIndex;
          const isActive = item.id === current;

          return (
            <li key={item.id} className="reserve-progress__step">
              {index > 0 && (
                <span
                  className={`reserve-progress__connector ${isComplete ? 'reserve-progress__connector--done' : ''}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`reserve-progress__dot ${
                  isActive
                    ? 'reserve-progress__dot--active'
                    : isComplete
                      ? 'reserve-progress__dot--done'
                      : ''
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {index + 1}
              </span>
            </li>
          );
        })}
      </ol>
      <span className="reserve-progress__labels" aria-hidden="true">
        experience · details · confirm
      </span>
    </nav>
  );
}
