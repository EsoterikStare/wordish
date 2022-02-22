import React from 'react';
import { Grid } from '@mui/material';
import { Delete } from 'react-feather';

import Key from './Key';
import ActionKey from './ActionKey';

import { letterStatus } from '../constants';
import { useAppState } from '../AppStateContext';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

const Keyboard = () => {
  const { state } = useAppState();

  const guessTypePriority = {
    [LOCATED]: 2,
    [PRESENT]: 1,
    [ABSENT]: 0
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
      if (prevType) {
        // if the letter is already guessed, only update if guess type improved
        if (guessTypePriority[prevType] < guessTypePriority[type]) {
          acc[guessChar] = type;
        }
      } else {
        // if the letter is not already guessed, add it as is.
        acc[guessChar] = type;
      }
    });
    return acc;
  }, {});

  const keyMap = (letter, index) => (
    <Key
      key={index.toString()}
      label={letter}
      guessedLetters={guessedLetters}
    />
  );

  return (
    <Grid id="keyboard-grid" alignItems="center" container flexDirection="column" item spacing={1.25}>
      <Grid id="keyboard-row-grid" container item justifyContent="center" spacing={1.25} wrap="nowrap">{topRow.map(keyMap)}</Grid>
      <Grid id="keyboard-row-grid" container item justifyContent="center" spacing={1.25} wrap="nowrap">{middleRow.map(keyMap)}</Grid>
      <Grid id="keyboard-row-grid" container item justifyContent="center" spacing={1.25} wrap="nowrap">
        <ActionKey label="Enter" action="submit" />
        {bottomRow.map(keyMap)}
        <ActionKey ariaLabel="delete" label={<Delete />} action="remove" />
      </Grid>
    </Grid>
  );
};

export default Keyboard;
