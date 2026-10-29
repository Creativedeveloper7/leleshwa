import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { initLeadTracking } from '../lib/analytics';
import { ReservationPage } from './ReservationPage';
import './reserve-page.css';

const root = document.getElementById('reserve-root');
if (!root) throw new Error('Reserve root element was not found');

initLeadTracking();

createRoot(root).render(
  <StrictMode>
    <ReservationPage />
  </StrictMode>,
);
