import React from 'react';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { useAppState } from '../AppStateContext';

const useStyles = createUseStyles({
  keyWrapper: {
    alignItems: 'center',
    backgroundColor: '#555555',
    borderRadius: 4,
    color: 'white',
    display: 'flex',
    fontSize: 16,
    fontFamily: 'sans-serif',
    height: 50,
    justifyContent: 'center',
    margin: 3,
    width: 55,
    cursor: 'pointer',
    userSelect: 'none'
  }
});

const Key = ({ label, action, ariaLabel }) => {
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
  const { keyWrapper } = useStyles();
  return (
    <div
      role="button"
      aria-label={ariaLabel || label}
      className={keyWrapper}
      onClick={dispatchAction}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      {label}
    </div>
  );
};

Key.propTypes = {
  action: string.isRequired,
  ariaLabel: string.isRequired,
  label: string.isRequired
};

export default Key;
