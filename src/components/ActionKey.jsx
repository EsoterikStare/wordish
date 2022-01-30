import React from 'react';
import { oneOfType, node, string } from 'prop-types';
import { Button, Grid, styled } from '@mui/material';

import { useAppState } from '../AppStateContext';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#555',
  color: 'white',
  fontSize: 12,
  padding: theme.spacing(2),
  height: 50,
  width: 55,
  minWidth: 55,
  userSelect: 'none'
}));

const ActionKey = ({ label, action, ariaLabel }) => {
  const { dispatch } = useAppState();
  const dispatchAction = () => {
    dispatch({ type: action });
  };
  const handleKeydown = (e) => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchAction();
    }
  };
  return (
    <Grid id="action-key-grid-item" item>
      <StyledButton
        aria-label={ariaLabel || label}
        onClick={dispatchAction}
        onKeyDown={handleKeydown}
      >
        {label}
      </StyledButton>
    </Grid>
  );
};

ActionKey.propTypes = {
  action: string.isRequired,
  ariaLabel: string,
  label: oneOfType([node, string]).isRequired
};

ActionKey.defaultProps = {
  ariaLabel: undefined
};

export default ActionKey;
