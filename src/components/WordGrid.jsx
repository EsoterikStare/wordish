import React from 'react';
import { Grid } from '@mui/material';

import Word from './Word';

import { useAppState } from '../AppStateContext';

const WordGrid = () => {
  const { state } = useAppState();

  // Empty words set based on current settings
  const getWordsTemplate = () => Array(state.maxGuesses).fill(
    Array(state.wordLength).fill({ guessChar: '' }),
  );

  // Empty words templates merged with previous guesses and current guess
  const getWords = () => getWordsTemplate().reduce((wordAcc, emptyWord, wordIndex) => {
    // Merge empty words with previous guesses and current guesses
    if (wordIndex < state.previousGuesses.length) {
      // Insert previous guesses at word indexes where those exist
      wordAcc.push(state.previousGuesses[wordIndex]);
    } else if (wordIndex === state.previousGuesses.length) {
      // Insert the characters of the current guess at the index after the last previous guess.
      const mergedGuess = emptyWord.reduce((mergeAcc, emptyChar, letterIndex) => {
        mergeAcc.push(state.currentGuess[letterIndex] || emptyChar);
        return mergeAcc;
      }, []);
      wordAcc.push(mergedGuess);
    } else {
      // Fill up the remaining words with empty placeholders
      wordAcc.push(emptyWord);
    }
    return wordAcc;
  }, []);

  return (
    <Grid data-testid="words-grid" alignItems="center" container item justifyContent="center" spacing={1}>
      {getWords().map((word, index) => (
        <Word key={`${word}-${index.toString()}`} word={word} />
      ))}
    </Grid>
  );
};

export default WordGrid;
