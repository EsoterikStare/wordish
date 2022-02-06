import { createTheme, darken } from '@mui/material';
import { amber } from '@mui/material/colors';

import { letterStatus } from './constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

export default createTheme({
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
      [LOCATED]: 'rgb(76, 103, 37)',
      [PRESENT]: darken(amber.A700, 0.3)
    },
    mode: 'dark'
  },
  spacing: 4
});
