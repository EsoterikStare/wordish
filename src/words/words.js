import fiveLetters from './fiveLetters';
import sixLetters from './sixLetters';

export const words = {
  5: fiveLetters,
  6: sixLetters
};

const getOrderOfMagnitudeLimit = (wordLength) => 10 ** words[wordLength].length.toString().length;
export const getRandomIndex = (wordLength) => (
  Math.floor(Math.random() * getOrderOfMagnitudeLimit(wordLength))
);

export const selectNewWord = (wordLength) => {
  const randomIndex = getRandomIndex(wordLength);
  const modulus = words[wordLength].length - 1;
  const selectedWord = words[wordLength][randomIndex % modulus];
  return selectedWord;
};
