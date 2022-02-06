import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AppStateProvider } from './AppStateContext';
import AppThemeProvider from './AppThemeProvider';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <AppStateProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AppStateProvider>
  </StrictMode>,
  rootElement
);
