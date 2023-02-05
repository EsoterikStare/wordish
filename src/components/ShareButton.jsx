import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { Share2 } from 'react-feather';

import { copyToClipboard, getShareGrid } from '../utils';
import { useAppState } from '../AppStateContext';

const ShareButton = () => {
  const { state } = useAppState();
  const shareGrid = getShareGrid(state);
  const { maxGuesses, previousGuesses, wordLength } = state;
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const guessCount = previousGuesses.length;

  const shareContent = [
    `Wordish | ${guessCount}/${maxGuesses}`,
    `${wordLength}-letter word`,
    '',
    shareGrid,
    '',
    `https://wordish.onrender.com/?p=${state.id}`,
  ].join('\r\n');

  const copyResult = (result) => setSnackbarOpen(result);

  const handleClick = () => {
    copyToClipboard(shareContent, copyResult);
  };

  return (
    <>
      <Button
        color="success"
        endIcon={<Share2 />}
        onClick={handleClick}
        variant="contained"
      >
        Share
      </Button>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={2500}
        message="Copied results to clipboard"
        onClose={() => setSnackbarOpen(false)}
        open={snackbarOpen}
      />
    </>
  );
};

export default ShareButton;
