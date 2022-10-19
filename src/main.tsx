import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Global styles
import './main.css';

// Create render container
const root = createRoot(document.getElementById('root') as HTMLElement);

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
