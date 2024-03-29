import React from 'react';
import { shape, string } from 'prop-types';
import { Button, Grid } from '@mui/material';

import { useAppState } from '../AppStateContext';

const Key = ({ label, guessedLetters }) => {
  const { dispatch } = useAppState();
  const dispatchAddAction = () => dispatch({ type: 'add', value: label });
  const handleKeyDown = e => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchAddAction();
    }
  };

  const keyStatus = guessedLetters[label.toLowerCase()];

  return (
    <Grid id="key-grid" item justifyContent="center">
      <Button
        role="button"
        disableFocusRipple
        onClick={dispatchAddAction}
        onKeyDown={handleKeyDown}
        sx={theme => ({
          backgroundColor: theme.palette.letterStatus[keyStatus] || '#555',
          color: 'white',
          fontSize: 20,
          height: 60,
          width: 38,
          minWidth: 38,
          userSelect: 'none',
          '&:hover': {
            backgroundColor: theme.palette.letterStatus[keyStatus] || '#555',
          },
        })}
      >
        {label.toUpperCase()}
      </Button>
    </Grid>
  );
};

Key.propTypes = {
  label: string.isRequired,
  guessedLetters: shape({}).isRequired,
};

export default Key;
