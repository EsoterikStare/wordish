import React from 'react';
import { shape, string } from 'prop-types';
import { Button, Grid, styled } from '@mui/material';

import { useAppState } from '../AppStateContext';

const StyledButton = styled(Button)(({ status, theme }) => ({
  backgroundColor: theme.palette.letterStatus[status] || '#555',
  color: 'white',
  fontSize: 20,
  height: 50,
  width: 35,
  minWidth: 35,
  userSelect: 'none'
}));

const Key = ({ label, guessedLetters }) => {
  const { dispatch } = useAppState();
  const dispatchAddAction = () => dispatch({ type: 'add', value: label });
  const handleKeyDown = (e) => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchAddAction();
    }
  };
  const keyStatus = guessedLetters[label.toLowerCase()];
  return (
    <Grid item>
      <StyledButton
        aria-label={label}
        role="button"
        onClick={dispatchAddAction}
        onKeyDown={handleKeyDown}
        status={keyStatus}
      >
        {label.toUpperCase()}
      </StyledButton>
    </Grid>
  );
};

Key.propTypes = {
  label: string.isRequired,
  guessedLetters: shape({}).isRequired
};

export default Key;
