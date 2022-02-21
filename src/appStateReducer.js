import { useSearchParams } from 'react-router-dom';

import { generatePuzzleId, getWordById, processGuess } from './utils';
import { getRandomIndex, selectNewWord } from './words';

const appStateReducer = (state, { type, value }) => {
  // const [searchParams, setSearchParams] = useSearchParams();
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
      const newRandomId = generatePuzzleId(getRandomIndex(state.wordLength), state.wordLength);
      // setSearchParams({ p: newRandomId });
      return {
        ...state,
        currentGuess: [],
        gameState: 'playing',
        previousGuesses: [],
        solution: selectNewWord(state.wordLength),
        id: newRandomId
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
    case 'updatePuzzleId': {
      const newWord = getWordById(value);
      console.log('updatePuzzleId', { value, newWord });
      return { ...state };
    }
    case 'updateDailyPuzzles': {
      console.log('updateDailyPuzzels', { value });
      return { ...state, daily: value };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default appStateReducer;
