import { TESTIMONIALS } from '../../constants/testimonials';
import { SectionCarousel } from '../shared/SectionCarousel';

export function TestimonialsSection() {
  return (
    <SectionCarousel ariaLabel="Guest testimonials" className="section-carousel--3up testimonials-carousel">
      {TESTIMONIALS.map((testimonial) => (
        <figure key={testimonial.id} className="test-card">
          <blockquote className="test-quote">"{testimonial.quote}"</blockquote>
          <figcaption className="test-author">
            <div
              className="test-avatar"
              style={{ backgroundImage: `url('${testimonial.avatar}')` }}
              aria-hidden="true"
            />
            <div>
              <div className="test-name">{testimonial.name}</div>
              <div className="test-loc">{testimonial.location}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </SectionCarousel>
  );
}
