import React from 'react';
import { createUseStyles } from 'react-jss';
import { Delete } from 'react-feather';

import Key from './Key';
import ActionKey from './ActionKey';
import { useAppState } from '../AppStateContext';

const useStyles = createUseStyles({
  keyboardWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
    maxWidth: 800
  },
  keyboardRow: {
    display: 'flex'
  }
});

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

const Keyboard = () => {
  const { state } = useAppState();
  const { keyboardWrapper, keyboardRow } = useStyles();

  const guessTypePriority = {
    located: 2,
    present: 1,
    absent: 0
  };

  /**
   * TODO: Improve functionality to be more aware of total count of letters
   * TODO: that occur more than once
   *
   * TODO: e.g. If one of two of the same letter is found, leave the key yellow
   * TODO: but show the green letter in the grid
   *
   * TODO: If all of a letter are found, don't show a yellow grid tile when more
   * TODO: of that letter are tried.
   */
  const guessedLetters = state.previousGuesses.reduce((acc, guessArray) => {
    guessArray.forEach(({ guessChar, type }) => {
      const prevType = acc[guessChar];
      if (prevType && guessTypePriority[prevType] < guessTypePriority[type]) {
        // if the letter is already guessed, only update if guess type improved
        acc[guessChar] = type;
      } else {
        // if the letter is not already guessed, add it as is.
        acc[guessChar] = type;
      }
    });
    return acc;
  }, {});

  console.log('Keyboard', { guessedLetters });

  const keyMap = (letter, index) => (
    <Key
      key={index.toString()}
      label={letter}
      guessedLetters={guessedLetters}
    />
  );

  return (
    <div className={keyboardWrapper}>
      <div className={keyboardRow}>{topRow.map(keyMap)}</div>
      <div className={keyboardRow}>{middleRow.map(keyMap)}</div>
      <div className={keyboardRow}>
        <ActionKey label="Enter" action="submit" />
        {bottomRow.map(keyMap)}
        <ActionKey ariaLabel="delete" label={<Delete />} action="remove" />
      </div>
    </div>
  );
};

export default Keyboard;
