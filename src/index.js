import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { AppStateProvider } from './AppStateContext';
import AppThemeProvider from './AppThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppStateProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path=":puzzleId" element={<App />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>Whoops! There&apos;s no such puzzle!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </AppStateProvider>
  </StrictMode>
);
