import { createTheme, darken } from '@mui/material';
import { amber, lightGreen } from '@mui/material/colors';

import { letterStatus } from './constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

export default createTheme({
  palette: {
    letterStatus: {
      [ABSENT]: '#252525',
      [LOCATED]: 'rgb(76, 103, 37)',
      [PRESENT]: darken(amber.A700, 0.3)
    }
  },
  spacing: 4
});
