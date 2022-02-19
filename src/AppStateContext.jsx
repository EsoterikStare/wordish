import React from 'react';
import { node } from 'prop-types';

import { letterStatus } from './constants';
import { selectNewWord } from './words';
import { useLocalStorage } from './utils';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const AppStateContext = React.createContext();

const processGuess = (guess, answer) => {
  const answerArray = answer.toLowerCase().split('');
  return guess.reduce((acc, { guessChar }, index) => {
    const correctPosition = guessChar.toLowerCase() === answerArray[index];
    const charPresent = answerArray.includes(guessChar.toLowerCase());
    const getGuessType = () => {
      if (correctPosition) return LOCATED;
      if (charPresent) return PRESENT;
      return ABSENT;
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
        const answer = state.secretWord.toLowerCase();

        // correct/win!
        if (guess === answer) {
          return {
            ...state,
            currentGuess: [],
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
            currentGuess: [],
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
          currentGuess: [],
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
    case 'updateWordLength': {
      return {
        ...state,
        currentGuess: [],
        maxGuesses: value + 1,
        previousGuesses: [],
        secretWord: selectNewWord(value),
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
  const [userWordLength, setUserWordLength] = useLocalStorage('wordLength', { parse: parseInt });
  const [userColorblindMode, setUserColorblindMode] = useLocalStorage('colorblindMode', { parse: (value) => (value === 'true') });
  const [storedPreviousGuesses, setStoredPreviousGuesses] = useLocalStorage('prevGuesses', { parse: JSON.parse });
  const [storedCurrentGuess, setStoredCurrentGuess] = useLocalStorage('currentGuess', { parse: JSON.parse });
  const [storedWord, setStoredWord] = useLocalStorage('secretWord');

  const [state, dispatch] = React.useReducer(userInputReducer, {
    colorblindMode: userColorblindMode || false,
    currentGuess: storedCurrentGuess || [],
    secretWord: storedWord || selectNewWord(userWordLength || 5),
    maxGuesses: (userWordLength && userWordLength + 1) || 6,
    wordLength: userWordLength || 5,
    previousGuesses: storedPreviousGuesses || [],
    gameState: 'playing'
  });

  console.log('AppStateProvider', { state, userWordLength, userColorblindMode });

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    const { wordLength } = state;
    setUserWordLength(wordLength);
  }, [state.wordLength]);

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    const { colorblindMode } = state;
    setUserColorblindMode(colorblindMode);
  }, [state.colorblindMode]);

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    const { previousGuesses } = state;
    setStoredPreviousGuesses(JSON.stringify(previousGuesses));
  }, [state.previousGuesses]);

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    const { currentGuess } = state;
    setStoredCurrentGuess(JSON.stringify(currentGuess));
  }, [state.currentGuess]);

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    const { secretWord } = state;
    setStoredWord(secretWord);
  }, [state.secretWord]);

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
