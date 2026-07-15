import { FormEvent, useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import type { NewsletterSubmitState } from '../../types/newsletter';
import { subscribeToNewsletter } from '../../utils/newsletterApi';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FooterStayInTouch() {
  const { socialLinks } = useSiteContent();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterSubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    const result = await subscribeToNewsletter({ email: trimmed, source: 'footer' });

    if (result.ok) {
      setStatus('success');
      setFeedback("You're on the list — welcome to Leleshwa.");
      setEmail('');
      return;
    }

    setStatus('error');
    setFeedback(result.message ?? 'Unable to subscribe. Please try again.');
  };

  return (
    <>
      <h5>Stay in Touch</h5>
      <p style={{ marginBottom: 4 }}>Stories from the bush, sent monthly.</p>

      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'error') {
              setStatus('idle');
              setFeedback('');
            }
          }}
          disabled={status === 'loading' || status === 'success'}
          required
          autoComplete="email"
          aria-invalid={status === 'error'}
          aria-describedby={feedback ? 'newsletter-feedback' : undefined}
        />
        <button type="submit" disabled={status === 'loading' || status === 'success'}>
          {status === 'loading' ? 'Joining…' : 'Join →'}
        </button>
      </form>

      {feedback && (
        <p
          id="newsletter-feedback"
          className={`newsletter-message${status === 'success' ? ' newsletter-message--success' : ' newsletter-message--error'}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {feedback}
        </p>
      )}

      <div className="footer-social" aria-label="Social media">
        {socialLinks.map((link, index) => (
          <span key={link.id} className="footer-social__item">
            {index > 0 && (
              <span className="footer-social__dot" aria-hidden="true">
                ·
              </span>
            )}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </>
  );
}
