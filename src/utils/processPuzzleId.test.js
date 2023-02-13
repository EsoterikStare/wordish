import { format } from 'date-fns';
import { generateDailyIds, generatePuzzleId, getWordById, parsePuzzleId } from './processPuzzleId';

const getFormattedDate = () => format(new Date(), 'yyyyMMdd');

describe('generateDailyIds', () => {
  it('should be defined', () => {
    expect(generateDailyIds).toBeDefined();
  });
  it('should return an object with the expected keys and value types', () => {
    const date = getFormattedDate();
    const result = generateDailyIds(date);

    expect(result).toHaveProperty('date');
    expect(result).toHaveProperty('fiveLetterId');
    expect(result).toHaveProperty('sixLetterId');

    expect(result.date).toBe(date);
    expect(typeof result.fiveLetterId).toBe('string');
    expect(typeof result.sixLetterId).toBe('string');
  });
});

describe('generatePuzzleId', () => {
  it('should be defined', () => {
    expect(generatePuzzleId).toBeDefined();
  });
  it('should generate a string from a word catalog index and word length', () => {
    const result = generatePuzzleId(5, 6);
    expect(typeof result).toBe('string');
  });
  it('should have a deterministic return value', () => {
    const resultA = generatePuzzleId(5, 6);
    const resultB = generatePuzzleId(5, 6);
    expect(resultA).toBe(resultB);
  });
});

describe('getWordById', () => {
  it('should be defined', () => {
    expect(getWordById).toBeDefined();
  });
  it('should return a word of the correct length given a valid puzzleId', () => {
    const fiveLetterResult = getWordById(generatePuzzleId(5, 5));
    const sixLetterResult = getWordById(generatePuzzleId(5, 6));

    expect(typeof fiveLetterResult).toBe('string');
    expect(fiveLetterResult).toHaveLength(5);

    expect(typeof sixLetterResult).toBe('string');
    expect(sixLetterResult).toHaveLength(6);
  });
  it('should return an empty string when an invalid id is provided', () => {
    const badWordLength = 7;
    const result = getWordById(generatePuzzleId(5, badWordLength));

    expect(result).toBe('');
  });
});

describe('parsePuzzleId', () => {
  it('should be defined', () => {
    expect(parsePuzzleId).toBeDefined();
  });
  it('should return index and length parts from a valid id', () => {
    const origIndex = 5;
    const origWordLength = 6;
    const { index, wordLength } = parsePuzzleId(generatePuzzleId(origIndex, origWordLength));

    expect(index).toBe(origIndex);
    expect(wordLength).toBe(origWordLength);
  });
});
