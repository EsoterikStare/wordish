import React from 'react';
import { node } from 'prop-types';

import { selectNewWord } from './words';
import { processGuess, useLocalStorage } from './utils';

const AppStateContext = React.createContext();

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
     * TODO: Store and display statistics
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
        const answer = state.solution.toLowerCase();

        // correct/win!
        if (guess === answer) {
          return {
            ...state,
            currentGuess: [],
            gameState: 'win',
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.solution)
            ]
          };
        }

        // wrong/out of guesses/lose!
        if (state.previousGuesses.length + 1 === state.maxGuesses) {
          return {
            ...state,
            currentGuess: [],
            gameState: 'lose',
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.solution)
            ]
          };
        }

        // wrong/next guess!
        return {
          ...state,
          currentGuess: [],
          previousGuesses: [
            ...state.previousGuesses,
            processGuess(state.currentGuess, state.solution)
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
        solution: selectNewWord(state.wordLength)
      };
    }
    case 'updateWordLength': {
      if (state.wordLength === value) {
        return { ...state };
      }

      return {
        ...state,
        currentGuess: [],
        maxGuesses: value + 1,
        previousGuesses: [],
        solution: selectNewWord(value),
        wordLength: value
      };
    }
    case 'updateColorblindMode': {
      return {
        ...state,
        colorblindMode: value
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const AppStateProvider = ({ children }) => {
  const [storedState, setStoredState] = useLocalStorage('appState', { parse: JSON.parse });

  const {
    colorblindMode: storedColorblindMode,
    currentGuess: storedCurrentGuess,
    solution: storedSolution,
    maxGuesses: storedMaxGuesses,
    wordLength: storedWordLength,
    previousGuesses: storedPreviousGuesses,
    gameState: storedGameState
  } = storedState || {};

  const [state, dispatch] = React.useReducer(userInputReducer, {
    colorblindMode: storedColorblindMode || false,
    currentGuess: storedCurrentGuess || [],
    solution: storedSolution || selectNewWord(storedWordLength || 5),
    maxGuesses: storedMaxGuesses || (storedWordLength && storedWordLength + 1) || 6,
    wordLength: storedWordLength || 5,
    previousGuesses: storedPreviousGuesses || [],
    gameState: storedGameState || 'playing'
  });

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    setStoredState(JSON.stringify(state));
  }, [state]);

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
