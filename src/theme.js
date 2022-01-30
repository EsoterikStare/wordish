import { createTheme } from '@mui/material';

import { letterStatus } from './constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

export default createTheme({
  palette: {
    letterStatus: {
      [ABSENT]: '#303030',
      [LOCATED]: 'darkolivegreen',
      [PRESENT]: 'darkgoldenrod'
    }
  },
  spacing: 4
});
