// import { format } from 'date-fns';

import appStateReducer from './appStateReducer';
import {
  midGuessGameState as midGuessGameStateJSON,
  newGameState as newGameStateJSON,
  winGameState as winGameStateJSON,
} from './test-utils';
import {
  // generateDailyIds,
  generatePuzzleId,
  getWordById,
  parsePuzzleId,
} from './utils';

const midGuessGameState = JSON.parse(midGuessGameStateJSON);
const newGameState = JSON.parse(newGameStateJSON);
const winGameState = JSON.parse(winGameStateJSON);

describe('appStateReducer', () => {
  it('should be defined', () => {
    expect(appStateReducer).toBeDefined();
  });
  it('should return the same state it was given and console.error when an unknown action type is provided', () => {
    jest.spyOn(console, 'error');
    const result = appStateReducer(newGameState, { type: 'non-existent' });
    expect(result).toBe(newGameState);
    expect(console.error).toHaveBeenCalled();
  });

  describe('add', () => {
    it('should add a new character to currentGuess array', () => {
      const value = 'a';
      const { currentGuess } = appStateReducer(newGameState, {
        type: 'add',
        value,
      });
      expect(currentGuess[0].guessChar).toBe(value);
    });
    it('should return the same state when the word length is already met', () => {
      const fullGuess = newGameState.solution.split('').map(guessChar => ({ guessChar }));
      const fullGuessGameState = { ...newGameState, currentGuess: fullGuess };

      expect(fullGuessGameState.currentGuess).toHaveLength(6);
      const { currentGuess } = appStateReducer(fullGuessGameState, {
        type: 'add',
        value: 'a',
      });
      expect(currentGuess).toHaveLength(6);
    });
    it('should not add a new character when gameState is not "playing"', () => {
      expect(winGameState.currentGuess).toHaveLength(0);
      const { currentGuess } = appStateReducer(winGameState, {
        type: 'add',
        value: 'a',
      });
      expect(currentGuess).toHaveLength(0);
    });
  });

  describe('remove', () => {
    it('should remove the last item in the currentGuess array', () => {
      expect(midGuessGameState.currentGuess).toHaveLength(3);
      const { currentGuess } = appStateReducer(midGuessGameState, {
        type: 'remove',
      });
      expect(currentGuess).toHaveLength(2);
    });
  });

  describe('submit', () => {
    it('should return the same state if the length of currentGuess does not match the current wordLength', () => {
      const { currentGuess, wordLength } = midGuessGameState;
      expect(currentGuess.length).toBeLessThan(wordLength);
      const newState = appStateReducer(midGuessGameState, { type: 'submit' });
      expect(newState).toBe(midGuessGameState);
    });
    it('should change the gameState to "win" if the guess is correct', () => {
      const correctGuess = newGameState.solution.split('').map(guessChar => ({ guessChar }));
      const correctGuessGameState = {
        ...newGameState,
        currentGuess: correctGuess,
      };

      const { gameState } = appStateReducer(correctGuessGameState, {
        type: 'submit',
      });
      expect(gameState).toBe('win');
    });
    it('should process and move the currentGuess to the previousGuesses if the guess is correct', () => {
      const correctGuess = newGameState.solution.split('').map(guessChar => ({ guessChar }));
      const correctGuessGameState = {
        ...newGameState,
        currentGuess: correctGuess,
      };
      const { previousGuesses: initPreviousGuesses } = correctGuessGameState;
      const initPreviousGuessesLength = initPreviousGuesses.length;

      const { currentGuess, previousGuesses } = appStateReducer(correctGuessGameState, {
        type: 'submit',
      });
      expect(currentGuess).toHaveLength(0);
      expect(previousGuesses).toHaveLength(initPreviousGuessesLength + 1);
    });
    it('should change the gameState to "lose" if the guess is not correct and no more guesses are allowed', () => {
      const incorrectGuess = 'wrongs'.split('').map(guessChar => ({ guessChar }));
      const incorrectGuessGameState = {
        ...newGameState,
        currentGuess: incorrectGuess,
        maxGuesses: 1,
      };

      const { gameState } = appStateReducer(incorrectGuessGameState, {
        type: 'submit',
      });
      expect(gameState).toBe('lose');
    });
    it('should process and move the currentGuess to the previousGuesses if the guess is not correct and no more guesses are allowed', () => {
      const incorrectGuess = 'wrongs'.split('').map(guessChar => ({ guessChar }));
      const incorrectGuessGameState = {
        ...newGameState,
        currentGuess: incorrectGuess,
        maxGuesses: 1,
      };
      const { previousGuesses: initPreviousGuesses } = incorrectGuessGameState;
      const initPreviousGuessesLength = initPreviousGuesses.length;

      const { currentGuess, previousGuesses } = appStateReducer(incorrectGuessGameState, {
        type: 'submit',
      });
      expect(currentGuess).toHaveLength(0);
      expect(previousGuesses).toHaveLength(initPreviousGuessesLength + 1);
    });
    it('should process and move the currentGuess to the previousGuesses if the guess is not correct and more guesses are allowed', () => {
      const incorrectGuess = 'wrongs'.split('').map(guessChar => ({ guessChar }));
      const incorrectGuessGameState = {
        ...newGameState,
        currentGuess: incorrectGuess,
      };
      const { previousGuesses: initPreviousGuesses } = incorrectGuessGameState;
      const initPreviousGuessesLength = initPreviousGuesses.length;

      const { currentGuess, previousGuesses } = appStateReducer(incorrectGuessGameState, {
        type: 'submit',
      });
      expect(currentGuess).toHaveLength(0);
      expect(previousGuesses).toHaveLength(initPreviousGuessesLength + 1);
    });
  });

  describe('reset', () => {
    it('should set currentGuess to an empty array', () => {
      const { currentGuess } = appStateReducer(winGameState, { type: 'reset' });
      expect(currentGuess).toStrictEqual([]);
    });
    it('should set gameState to "playing"', () => {
      const { gameState } = appStateReducer(winGameState, { type: 'reset' });
      expect(gameState).toBe('playing');
    });
    it('should set previousGuesses to an empty array', () => {
      const { previousGuesses } = appStateReducer(winGameState, {
        type: 'reset',
      });
      expect(previousGuesses).toStrictEqual([]);
    });
    it('should set solution to a new random word', () => {
      const { solution: prevSolution } = winGameState;
      const { solution } = appStateReducer(winGameState, { type: 'reset' });
      expect(solution).not.toBe(prevSolution);
    });
    it('should set id to a new random puzzleId', () => {
      const { id: prevId } = winGameState;
      const { id } = appStateReducer(winGameState, { type: 'reset' });
      expect(id).not.toBe(prevId);
    });
    it('should set add idUpdateFlag key and set to true', () => {
      expect(winGameState.hasOwnProperty('idUpdateFlag')).toBe(false);
      const newState = appStateReducer(winGameState, { type: 'reset' });
      expect(newState.hasOwnProperty('idUpdateFlag')).toBe(true);
      expect(newState.idUpdateFlag).toBe(true);
    });
  });

  describe('updateWordLength', () => {
    it('should return the same state if the wordLength already matches the new value', () => {
      const newState = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: midGuessGameState.wordLength,
      });
      expect(newState).toStrictEqual(midGuessGameState);
    });
    it('should set currentGuess to an empty array', () => {
      const { currentGuess } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: 6,
      });
      expect(currentGuess).toStrictEqual([]);
    });
    it('should set maxGuesses to the provided value + 1', () => {
      const value = 6;
      const { maxGuesses } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value,
      });
      expect(maxGuesses).toBe(value + 1);
    });
    it('should set previousGuesses to an empty array', () => {
      const { previousGuesses } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: 6,
      });
      expect(previousGuesses).toStrictEqual([]);
    });
    it('should set solution to a new random word', () => {
      const { solution: prevSolution } = midGuessGameState;
      const { solution } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: 6,
      });
      expect(solution).not.toBe(prevSolution);
    });
    it('should set wordLength to the provided value', () => {
      const value = 6;
      const { wordLength } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value,
      });
      expect(wordLength).toBe(value);
    });
    it('should set id to a new random puzzleId', () => {
      const { id: prevId } = midGuessGameState;
      const { id } = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: 6,
      });
      expect(id).not.toBe(prevId);
    });
    it('should set add idUpdateFlag key and set to true', () => {
      expect(midGuessGameState.hasOwnProperty('idUpdateFlag')).toBe(false);
      const newState = appStateReducer(midGuessGameState, {
        type: 'updateWordLength',
        value: 6,
      });
      expect(newState.hasOwnProperty('idUpdateFlag')).toBe(true);
      expect(newState.idUpdateFlag).toBe(true);
    });
  });

  describe('updateColorblindMode', () => {
    it('should set colorblindMode to the provided value', () => {
      const { colorblindMode: prevColorblindMode } = newGameState;
      const value = !prevColorblindMode;
      const { colorblindMode } = appStateReducer(newGameState, {
        type: 'updateColorblindMode',
        value,
      });
      expect(colorblindMode).toBe(value);
    });
  });

  describe('loadNewPuzzle', () => {
    it('should set currentGuess to an empty array', () => {
      const { currentGuess } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value: generatePuzzleId(),
      });
      expect(currentGuess).toStrictEqual([]);
    });
    it('should set id to the provided value', () => {
      const value = generatePuzzleId();
      const { id } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value,
      });
      expect(id).toBe(value);
    });
    it('should set add idUpdateFlag key and set to true', () => {
      expect(midGuessGameState.hasOwnProperty('idUpdateFlag')).toBe(false);
      const newState = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value: generatePuzzleId(),
      });
      expect(newState.hasOwnProperty('idUpdateFlag')).toBe(true);
      expect(newState.idUpdateFlag).toBe(true);
    });
    it('should set maxGuesses to the parsed wordLength + 1', () => {
      const value = generatePuzzleId();
      const { wordLength } = parsePuzzleId(value);
      const { maxGuesses } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value,
      });
      expect(maxGuesses).toBe(wordLength + 1);
    });
    it('should set previousGuesses to an empty array', () => {
      const { previousGuesses } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value: generatePuzzleId(),
      });
      expect(previousGuesses).toStrictEqual([]);
    });
    it('should set solution to the word matching the provided puzzleId value', () => {
      const value = generatePuzzleId();
      const newWord = getWordById(value);
      const { solution } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value,
      });
      expect(solution).toBe(newWord);
    });
    it('should set wordLength to the value matching the provided puzzleId value', () => {
      const value = generatePuzzleId();
      const { wordLength: newWordLength } = parsePuzzleId(value);
      const { wordLength } = appStateReducer(midGuessGameState, {
        type: 'loadNewPuzzle',
        value,
      });
      expect(wordLength).toBe(newWordLength);
    });
  });

  describe('updateDailyPuzzle', () => {
    // TODO: Figure out why this test fails ONLY in the Github actions... >=(
    // it('updates the daily object to the value provided', () => {
    //   const formattedDate = format(new Date(), 'yyyyMMdd');
    //   const value = generateDailyIds(formattedDate);
    //   const { daily } = appStateReducer(midGuessGameState, { type: 'updateDailyPuzzle', value });
    //   console.log({ formattedDate, value, daily });
    //   expect(daily).toStrictEqual(value);
    // });
  });

  describe('removeIdUpdateFlag', () => {
    it('should delete the idUpdateFlag key from state', () => {
      const testGameState = { ...midGuessGameState, idUpdateFlag: true };
      expect(testGameState.hasOwnProperty('idUpdateFlag')).toBe(true);
      const newState = appStateReducer(testGameState, {
        type: 'removeIdUpdateFlag',
      });
      expect(newState.hasOwnProperty('idUpdateFlag')).toBe(false);
    });
  });
});
