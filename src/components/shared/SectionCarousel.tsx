import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

interface SectionCarouselProps {
  children: ReactNode;
  ariaLabel: string;
  /** Modifier class controlling slides-per-view, e.g. `section-carousel--3up`. */
  className?: string;
  tone?: 'light' | 'dark';
}

export function SectionCarousel({
  children,
  ariaLabel,
  className = '',
  tone = 'light',
}: SectionCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const slideStep = useCallback(() => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = slideStep();
    if (step > 0) {
      setActive(Math.round(el.scrollLeft / step));
      setVisible(Math.max(1, Math.round(el.clientWidth / step)));
    }
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [slideStep]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [update, slides.length]);

  const go = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * slideStep() * visible, behavior: 'smooth' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const total = slides.length;
  const lastShown = Math.min(total, active + visible);
  const progress = total > 0 ? (lastShown / total) * 100 : 0;
  const hasOverflow = canPrev || canNext;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      className={`section-carousel section-carousel--${tone}${className ? ` ${className}` : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={trackRef}
        className="section-carousel__track"
        role="list"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {slides.map((slide, index) => (
          <div
            key={isValidElement(slide) && slide.key !== null ? slide.key : index}
            className="section-carousel__slide"
            role="listitem"
            aria-label={`${index + 1} of ${total}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {hasOverflow && (
        <div className="section-carousel__controls">
          <span className="section-carousel__count" aria-live="polite">
            {pad(lastShown)} <span aria-hidden="true">/</span>
            <span className="sr-only"> of </span> {pad(total)}
          </span>
          <div className="section-carousel__progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="section-carousel__arrows">
            <button
              type="button"
              className="section-carousel__arrow"
              onClick={() => go(-1)}
              disabled={!canPrev}
              aria-label="Previous slides"
            >
              <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="section-carousel__arrow"
              onClick={() => go(1)}
              disabled={!canNext}
              aria-label="Next slides"
            >
              <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
