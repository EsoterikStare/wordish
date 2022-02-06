import React from 'react';
import { string } from 'prop-types';
import {
  Button,
  Grid,
  Typography,
  styled
} from '@mui/material';
import { RefreshCcw, Settings as SettingsIcon, Share2 } from 'react-feather';

import GameOverDialog from './GameOverDialog';
import Settings from './Settings';

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
  const { state, dispatch } = useAppState();
  const dispatchResetAction = () => dispatch({ type: 'reset' });
  const actionKeys = [' ', 'Enter'];
  const handleResetKeyDown = (e) => {
    if (actionKeys.includes(e.key)) {
      dispatchResetAction();
    }
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [settingsAnchor, setSettingsAnchor] = React.useState();
  const onSettingsClick = (e) => {
    setSettingsAnchor(e.target);
  };
  const onSettingsClose = () => setSettingsAnchor(undefined);

  React.useEffect(() => {
    if (state.gameState !== 'playing') {
      setDialogOpen(true);
    }
  }, [state.gameState]);

  return (
    <>
      <Grid id="header-grid" alignItems="center" container justifyContent="center" item spacing={4}>
        <Grid container item justifyContent="end" spacing={4} xs>
          <Grid id="reset-button-grid" item>
            <HeaderButton
              aria-label="reset"
              onClick={dispatchResetAction}
              onKeyDown={handleResetKeyDown}
            >
              <RefreshCcw />
            </HeaderButton>
          </Grid>
        </Grid>
        <Grid item xs="auto">
          <Typography component="h1" sx={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Grid>
        <Grid container item justifyContent="start" spacing={4} xs>
          <Grid id="stats-dialog-grid" item>
            <HeaderButton
              aria-label="Stats and Share"
              onClick={() => setDialogOpen(true)}
              onKeyDown={(e) => {
                if (actionKeys.includes(e.key)) {
                  setDialogOpen(true);
                }
              }}
            >
              <Share2 />
            </HeaderButton>
          </Grid>
          <Grid id="settings-button-grid" item>
            <HeaderButton
              aria-label="settings"
              onClick={onSettingsClick}
              onKeyDown={(e) => {
                if (actionKeys.includes(e.key)) {
                  onSettingsClick(e);
                }
              }}
            >
              <SettingsIcon style={{ pointerEvents: 'none' }} />
            </HeaderButton>
            <Settings anchorEl={settingsAnchor} onClose={onSettingsClose} />
          </Grid>
        </Grid>
      </Grid>
      <GameOverDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

Header.propTypes = {
  title: string.isRequired
};

export default Header;
