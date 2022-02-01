import React from 'react';
import { oneOfType, node, string } from 'prop-types';
import { Button, darken, Grid } from '@mui/material';

import { useAppState } from '../AppStateContext';

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
      <Button
        aria-label={ariaLabel || label}
        disableFocusRipple
        onClick={dispatchAction}
        onKeyDown={handleKeydown}
        sx={(theme) => ({
          backgroundColor: '#555',
          color: 'white',
          fontSize: 12,
          padding: theme.spacing(2),
          height: 50,
          width: 55,
          minWidth: 55,
          userSelect: 'none',
          '&:hover': {
            backgroundColor: '#555'
          }
        })}
      >
        {label}
      </Button>
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
