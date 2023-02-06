/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AppStateProvider } from '../AppStateContext';
import AppThemeProvider from '../AppThemeProvider';

const setup = (jsx) => ({
  user: userEvent.setup(),
  ...render(
    <AppStateProvider>
      <AppThemeProvider>
        {jsx}
      </AppThemeProvider>
    </AppStateProvider>,
  ),
});

export default setup;
