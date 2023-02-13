import { words } from '../words';

const BASE = 16;
const MULTIPLIER = 365;

const encode = number => Math.abs(number * MULTIPLIER).toString(BASE);

const wordCounts = Object.keys(words).reduce((acc, key) => {
  acc[key] = words[key].length;
  return acc;
}, {});

// Given an index and word length, deterministically generate an id
export const generatePuzzleId = (index, wordLength) => {
  const wordLengthPart = encode(wordLength);
  const indexPart = encode(index);
  return `${indexPart}${wordLengthPart}`;
};

// Given a puzzle id, resolve the index and word length used to generated it.
export const parsePuzzleId = id => {
  const decode = hex => parseInt(hex, BASE) / MULTIPLIER;
  const index = decode(id.slice(0, -3));
  const wordLength = decode(id.slice(-3));
  return { index, wordLength };
};

export const getWordById = id => {
  const { index, wordLength } = parsePuzzleId(id);
  const newWord = (words[wordLength] && words[wordLength][index % wordCounts[wordLength]]) || '';
  return newWord;
};

// Given a date (YYYYMMDD), deterministically generate an id for the puzzle for that date.
export const generateDailyIds = date => {
  const generateIdForLength = length =>
    generatePuzzleId((parseInt(date, 10) * MULTIPLIER) % wordCounts[length], length);

  return {
    date,
    fiveLetterId: generateIdForLength(5),
    sixLetterId: generateIdForLength(6),
  };
};
