import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  showNav?: boolean;
  shellClassName?: string;
  role?: string;
}

export function HorizontalScroll({
  children,
  className = '',
  ariaLabel,
  showNav = true,
  shellClassName = '',
  role,
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanPrev(hasOverflow && el.scrollLeft > 4);
    setCanNext(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateControls();
    el.addEventListener('scroll', updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', updateControls);
      observer.disconnect();
    };
  }, [updateControls, children]);

  const scrollByPage = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(220, Math.round(el.clientWidth * 0.82));
    el.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  const navVisible = showNav && (canPrev || canNext);

  return (
    <div className={`hscroll-shell${shellClassName ? ` ${shellClassName}` : ''}`}>
      {navVisible && (
        <div className="hscroll-shell__nav">
          <button
            type="button"
            className="acc-related__arrow hscroll-shell__arrow hscroll-shell__arrow--prev"
            onClick={() => scrollByPage('prev')}
            disabled={!canPrev}
            aria-label="Scroll previous"
          >
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="acc-related__arrow hscroll-shell__arrow hscroll-shell__arrow--next"
            onClick={() => scrollByPage('next')}
            disabled={!canNext}
            aria-label="Scroll next"
          >
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className={`hscroll-wrap hscroll-track${className ? ` ${className}` : ''}`}
        tabIndex={0}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
}
