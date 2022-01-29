import React from 'react';
import { node } from 'prop-types';

import { selectNewWord } from './words';

const AppStateContext = React.createContext();

const processGuess = (guess, answer) => {
  const answerArray = answer.toLowerCase().split('');
  return guess.reduce((acc, { guessChar }, index) => {
    const correctPosition = guessChar.toLowerCase() === answerArray[index];
    const charPresent = answerArray.includes(guessChar.toLowerCase());
    const getGuessType = () => {
      // TODO: Make these guess types a constant and reference them everywhere.
      if (correctPosition) return 'located';
      if (charPresent) return 'present';
      return 'absent';
    };
    acc.push({ guessChar, type: getGuessType() });
    return acc;
  }, []);
};

const userInputReducer = (state, { type, value }) => {
  switch (type) {
    case 'add': {
      if (
        state.currentGuess.length < state.wordLength
        && state.gameState === 'playing'
      ) {
        return {
          ...state,
          currentGuess: [...state.currentGuess, { guessChar: value }]
        };
      }
      return state;
    }
    case 'remove': {
      const sliceIndex = state.currentGuess.length - 1;
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, sliceIndex) // remove last index
      };
    }

    /**
     * TODO: Create a dialog for win/lose states with reset option and appropriate results info
     * TODO: Create logic to generate share output with colored grid boxes.
     * TODO: Check to make sure guess is actually a word. (Wordle does it with no web request...)
     */
    case 'submit': {
      // check guess and either end game or set guess colors and
      // setup next guess.
      if (state.currentGuess.length === state.wordLength) {
        const guess = state.currentGuess
          .map(({ guessChar }) => guessChar)
          .join('')
          .toLowerCase();
        const answer = state.secretWord.toLowerCase();

        // correct/win!
        if (guess === answer) {
          return {
            ...state,
            currentGuess: '',
            gameState: 'win',
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.secretWord)
            ]
          };
        }

        // wrong/out of guesses/lose!
        if (state.previousGuesses.length + 1 === state.maxGuesses) {
          return {
            ...state,
            currentGuess: '',
            gameState: 'lose',
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.secretWord)
            ]
          };
        }

        // wrong/next guess!
        return {
          ...state,
          currentGuess: '',
          previousGuesses: [
            ...state.previousGuesses,
            processGuess(state.currentGuess, state.secretWord)
          ]
        };
      }

      // If none of these cases, return the original state, unaltered.
      return state;
    }
    case 'reset': {
      return {
        ...state,
        currentGuess: [],
        gameState: 'playing',
        previousGuesses: [],
        secretWord: selectNewWord(state.wordLength)
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

/**
 * TODO: Hook up options menu for things like letter count, color mode, and possibly max guesses.
 */
const AppStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userInputReducer, {
    currentGuess: [],
    secretWord: selectNewWord(6),
    maxGuesses: 7,
    wordLength: 6,
    previousGuesses: [],
    gameState: 'playing'
  });

  const value = React.useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: node.isRequired
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
