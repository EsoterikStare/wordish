import React from 'react';
import { bool, func } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Share2 } from 'react-feather';

import { useAppState } from '../AppStateContext';

const GameOverDialog = ({ open, onClose }) => {
  const { state, dispatch } = useAppState();
  const titles = {
    playing: "Don't give up!",
    win: 'You did it!',
    lose: "That's ok! Try another!"
  };
  const dialogContent = "Someday, I'll have some metrics to show you. But not today. =(";
  const handleResetButtonClick = () => {
    dispatch({ type: 'reset' });
    onClose();
  };

  return (
    <Dialog
      aria-labelledby="game-over-dialog-title"
      aria-describedby="game-over-dialog-content-text"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="game-over-dialog-title">
        {titles[state.gameState]}
      </DialogTitle>
      <DialogContent>
        {state.gameState === 'lose' && <DialogContentText sx={{ my: 4 }}>{`The word was ${state.secretWord.toUpperCase()}`}</DialogContentText>}
        <DialogContentText id="game-over-dialog-content-text">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {state.gameState === 'win' && (
        <Button
          color="success"
          endIcon={<Share2 />}
          onClick={() => alert("Sharing isn't hooked up yet... =(")}
          variant="contained"
        >
          Share
        </Button>
        )}
        <Button color="primary" onClick={handleResetButtonClick} variant="contained">Another!</Button>
      </DialogActions>
    </Dialog>
  );
};

GameOverDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired
};

GameOverDialog.defaultProps = {};

export default GameOverDialog;
