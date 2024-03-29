import React from 'react';
import { bool, func } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import ShareButton from './ShareButton';

import { useAppState } from '../AppStateContext';

const GameOverDialog = ({ open, onClose }) => {
  const { state, dispatch } = useAppState();
  const titles = {
    playing: "Don't give up!",
    win: 'You did it!',
    lose: "That's ok! Try another!",
  };
  const dialogContent = "Someday, I'll have some metrics to show you. But not today. =(";
  const handleResetButtonClick = () => {
    dispatch({ type: 'reset' });
    onClose();
  };

  return (
    <Dialog
      aria-labelledby="stats-dialog-title"
      aria-describedby="stats-dialog-content-text"
      onClose={onClose}
      open={open}
    >
      <DialogTitle data-testid="stats-dialog-title">{titles[state.gameState]}</DialogTitle>
      <DialogContent>
        {state.gameState === 'lose' && (
          <DialogContentText
            sx={{ my: 4 }}
          >{`The word was ${state.solution.toUpperCase()}`}</DialogContentText>
        )}
        <DialogContentText data-testid="stats-dialog-content-text">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {state.gameState === 'win' && <ShareButton />}
        <Button
          color={state.gameState === 'playing' ? 'error' : 'primary'}
          onClick={handleResetButtonClick}
          variant="contained"
        >
          {state.gameState === 'playing' ? 'New word' : 'Another!'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

GameOverDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

GameOverDialog.defaultProps = {};

export default GameOverDialog;
