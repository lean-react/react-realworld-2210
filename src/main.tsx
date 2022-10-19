import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Global styles
import './main.css';

// Roboto Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create render container
const root = createRoot(document.getElementById('root') as HTMLElement);

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
