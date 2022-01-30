import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';

import App from './App';
import { AppStateProvider } from './AppStateContext';

import theme from './theme';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppStateProvider>
  </StrictMode>,
  rootElement
);
