import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AboutSection } from './components/about/AboutSection';
import { AccommodationSection } from './components/accommodation/AccommodationSection';
import { DiningSection } from './components/dining/DiningSection';
import { EventSection } from './components/events/EventSection';
import { ExperienceSection } from './components/experiences/ExperienceSection';
import { FooterStayInTouch } from './components/footer/FooterStayInTouch';
import { GallerySection } from './components/gallery/GallerySection';
import './index.css';

const reservationRoot = document.getElementById('reservation-root');
if (reservationRoot) {
  createRoot(reservationRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const accommodationRoot = document.getElementById('accommodation-root');
if (accommodationRoot) {
  createRoot(accommodationRoot).render(
    <StrictMode>
      <AccommodationSection />
    </StrictMode>,
  );
}

const aboutRoot = document.getElementById('about-root');
if (aboutRoot) {
  createRoot(aboutRoot).render(
    <StrictMode>
      <AboutSection />
    </StrictMode>,
  );
}

const experienceRoot = document.getElementById('experience-root');
if (experienceRoot) {
  createRoot(experienceRoot).render(
    <StrictMode>
      <ExperienceSection />
    </StrictMode>,
  );
}

const diningRoot = document.getElementById('dining-root');
if (diningRoot) {
  createRoot(diningRoot).render(
    <StrictMode>
      <DiningSection />
    </StrictMode>,
  );
}

const galleryRoot = document.getElementById('gallery-root');
if (galleryRoot) {
  createRoot(galleryRoot).render(
    <StrictMode>
      <GallerySection />
    </StrictMode>,
  );
}

const eventRoot = document.getElementById('event-root');
if (eventRoot) {
  createRoot(eventRoot).render(
    <StrictMode>
      <EventSection />
    </StrictMode>,
  );
}

const footerStayRoot = document.getElementById('footer-stay-root');
if (footerStayRoot) {
  createRoot(footerStayRoot).render(
    <StrictMode>
      <FooterStayInTouch />
    </StrictMode>,
  );
}
