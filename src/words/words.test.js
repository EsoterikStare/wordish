import { getRandomIndex, selectNewWord } from './words';
import fiveLetterWords from './fiveLetters';
import sixLetterWords from './sixLetters';

const fiveLetterWordCount = fiveLetterWords.length;
const sixLetterWordCount = sixLetterWords.length;

const fiveLetterWordCountDigits = fiveLetterWordCount.toString().length;
const sixLetterWordCountDigits = sixLetterWordCount.toString().length;

describe('getRandomIndex', () => {
  it('should be defined', () => {
    expect(getRandomIndex).toBeDefined();
  });
  it('should return a random index integer given a wordLength of 5', () => {
    const result = getRandomIndex(5);
    const resultDigits = result.toString().length;

    expect(typeof result).toBe('number');
    expect(resultDigits).toBe(fiveLetterWordCountDigits);
  });
  it('should return a random index integer given a wordLength of 6', () => {
    const result = getRandomIndex(6);
    const resultDigits = result.toString().length;

    expect(typeof result).toBe('number');
    expect(resultDigits).toBe(sixLetterWordCountDigits);
  });
});

describe('selectNewWord', () => {
  it('should be defined', () => {
    expect(selectNewWord).toBeDefined();
  });
  it('should return a word given a valid wordLength', () => {
    expect(typeof selectNewWord(5)).toBe('string');
  });
  it('should return a word of the correct length given a valid wordLength', () => {
    expect(selectNewWord(5)).toHaveLength(5);
    expect(selectNewWord(6)).toHaveLength(6);
  });
  it('should return a random word given a valid wordLength', () => {
    const resultA = selectNewWord(5);
    const resultB = selectNewWord(5);

    expect(resultA).not.toBe(resultB);
  });
});
