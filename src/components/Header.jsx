import React from 'react';
import { string } from 'prop-types';
import {
  Button,
  Grid,
  Typography,
  styled
} from '@mui/material';
import { RefreshCcw, Settings } from 'react-feather';

import { useAppState } from '../AppStateContext';

const HeaderButton = styled(Button)(() => ({
  backgroundColor: '#333',
  color: 'white',
  height: 40,
  minWidth: 40,
  padding: 4,
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#333',
  }
}));

const Header = ({ title }) => {
  const { dispatch } = useAppState();
  const dispatchResetAction = () => dispatch({ type: 'reset' });
  const handleResetKeyDown = (e) => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchResetAction();
    }
  };
  return (
    <Grid id="header-grid" alignItems="center" container justifyContent="center" item spacing={4}>
      <Grid id="reset-button-grid" item>
        <HeaderButton
          aria-label="reset"
          onClick={dispatchResetAction}
          onKeyDown={handleResetKeyDown}
        >
          <RefreshCcw />
        </HeaderButton>
      </Grid>
      <Grid item xs="auto">
        <Typography component="h1" sx={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Grid id="settings-button-grid" item>
        <HeaderButton
          aria-label="settings"
            // eslint-disable-next-line no-alert
          onClick={() => alert('Settings coming soon...')}
          onKeyDown={(e) => {
            const actionKeys = [' ', 'Enter'];
            if (actionKeys.includes(e.key)) {
              // eslint-disable-next-line no-alert
              alert('Settings coming soon...');
            }
          }}
        >
          <Settings />
        </HeaderButton>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  title: string.isRequired
};

export default Header;
