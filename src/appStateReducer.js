import { parsePuzzleId, generatePuzzleId, getWordById, processGuess } from './utils';
import { getRandomIndex } from './words';

const appStateReducer = (state, { type, value }) => {
  switch (type) {
    case 'add': {
      if (state.currentGuess.length < state.wordLength && state.gameState === 'playing') {
        return {
          ...state,
          currentGuess: [...state.currentGuess, { guessChar: value }],
        };
      }
      return state;
    }
    case 'remove': {
      const sliceIndex = state.currentGuess.length - 1;
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, sliceIndex), // remove last index
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
              processGuess(state.currentGuess, state.solution),
            ],
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
              processGuess(state.currentGuess, state.solution),
            ],
          };
        }

        // wrong/next guess!
        return {
          ...state,
          currentGuess: [],
          previousGuesses: [
            ...state.previousGuesses,
            processGuess(state.currentGuess, state.solution),
          ],
        };
      }

      // If none of these cases, return the original state, unaltered.
      return state;
    }
    case 'reset': {
      const newRandomId = generatePuzzleId(getRandomIndex(state.wordLength), state.wordLength);
      const newRandomWord = getWordById(newRandomId);
      return {
        ...state,
        currentGuess: [],
        gameState: 'playing',
        id: newRandomId,
        idUpdateFlag: true,
        previousGuesses: [],
        solution: newRandomWord,
      };
    }
    case 'updateWordLength': {
      if (state.wordLength === value) {
        return { ...state };
      }

      const newRandomId = generatePuzzleId(getRandomIndex(value), value);
      const newRandomWord = getWordById(newRandomId);

      return {
        ...state,
        currentGuess: [],
        id: newRandomId,
        idUpdateFlag: true,
        maxGuesses: value + 1,
        previousGuesses: [],
        solution: newRandomWord,
        wordLength: value,
      };
    }
    case 'updateColorblindMode': {
      return {
        ...state,
        colorblindMode: value,
      };
    }
    case 'loadNewPuzzle': {
      const { wordLength } = parsePuzzleId(value);
      const newWord = getWordById(value);
      return {
        ...state,
        currentGuess: [],
        id: value,
        idUpdateFlag: true,
        maxGuesses: wordLength + 1,
        previousGuesses: [],
        solution: newWord,
        wordLength,
      };
    }
    case 'updateDailyPuzzles': {
      // console.log('updateDailyPuzzles', { value });
      return { ...state, daily: value };
    }
    case 'removeIdUpdateFlag': {
      const newState = { ...state };
      delete newState.idUpdateFlag;
      return { ...newState };
    }
    default: {
      console.error(new Error(`Unhandled action type: ${type}`));
      return state;
    }
  }
};

export default appStateReducer;
