import React from 'react';
import { node } from 'prop-types';
import { createTheme, darken, ThemeProvider } from '@mui/material';
import { amber, blue, orange } from '@mui/material/colors';

import { letterStatus } from './constants';
import { useAppState } from './AppStateContext';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const AppThemeProvider = ({ children }) => {
  const { state } = useAppState();
  const { colorblindMode } = state;

  const theme = createTheme({
    components: {
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center'
          }
        }
      }
    },
    palette: {
      letterStatus: {
        [ABSENT]: '#252525',
        [LOCATED]: colorblindMode ? blue[500] : 'rgb(76, 103, 37)',
        [PRESENT]: colorblindMode ? orange[500] : darken(amber.A700, 0.3)
      },
      mode: 'dark'
    },
    spacing: 4
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

AppThemeProvider.propTypes = {
  children: node.isRequired
};

export default AppThemeProvider;
