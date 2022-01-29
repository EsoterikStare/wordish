import React from 'react';
import { createUseStyles } from 'react-jss';

import { colorMap } from '../constants';

const useStyles = createUseStyles({
  // TODO: Add little "pop" animation when adding a letter
  // TODO: Add card flip animation on submit
  letter: ({ type }) => ({
    alignItems: 'center',
    backgroundColor: colorMap[type],
    border: '2px solid',
    borderColor: type ? 'transparent' : '#333',
    borderRadius: 2,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    width: 50,
    height: 50,
    fontSize: 32,
    fontFamily: 'sans-serif',
    margin: 2,
    userSelect: 'none'
  })
});

const Letter = ({ guessChar, type }) => {
  const { letter } = useStyles({ type });
  return <div className={letter}>{guessChar.toUpperCase()}</div>;
};

export default Letter;
