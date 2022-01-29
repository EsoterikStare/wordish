import React from 'react';
import { shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { useAppState } from '../AppStateContext';
import { colorMap } from '../constants';

const useStyles = createUseStyles({
  keyWrapper: {
    alignItems: 'center',
    backgroundColor: ({ state }) => colorMap[state] || '#555555',
    borderRadius: 4,
    color: 'white',
    display: 'flex',
    fontSize: 20,
    fontFamily: 'sans-serif',
    height: 50,
    justifyContent: 'center',
    margin: 3,
    width: 35,
    cursor: 'pointer',
    userSelect: 'none'
  }
});

const Key = ({ label, guessedLetters }) => {
  const { dispatch } = useAppState();
  const dispatchAddAction = () => dispatch({ type: 'add', value: label });
  const handleKeyDown = (e) => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchAddAction();
    }
  };
  const keyState = guessedLetters[label.toLowerCase()];
  console.log('Key', { label, keyState });
  const { keyWrapper } = useStyles({
    state: keyState
  });
  return (
    <div
      aria-label={label}
      role="button"
      className={keyWrapper}
      onClick={dispatchAddAction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {label.toUpperCase()}
    </div>
  );
};

Key.propTypes = {
  label: string.isRequired,
  guessedLetters: shape({}).isRequired
};

export default Key;
