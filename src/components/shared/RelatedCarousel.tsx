import { type ReactNode } from 'react';
import { HorizontalScroll } from './HorizontalScroll';

interface RelatedCarouselProps {
  headingId: string;
  title?: string;
  scrollClassName?: string;
  children: ReactNode;
}

export function RelatedCarousel({
  headingId,
  title = 'You May Also Like',
  scrollClassName = 'acc-related-scroll',
  children,
}: RelatedCarouselProps) {
  return (
    <section className="acc-related" aria-labelledby={headingId}>
      <div className="acc-related__head">
        <h4 id={headingId} className="acc-detail-amenities-title">
          {title}
        </h4>
      </div>

      <HorizontalScroll
        className={scrollClassName}
        ariaLabel={`${title} carousel`}
        shellClassName="acc-related-carousel"
        showNav
      >
        {children}
      </HorizontalScroll>
    </section>
  );
}
