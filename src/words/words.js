import fiveLetters from './fiveLetters';
import sixLetters from './sixLetters';

export const words = {
  5: fiveLetters,
  6: sixLetters,
};

// Dynamically calculate the order of magnitude of the current word count to avoid an
// arbitrarily large number to base our random index on.
const getOrderOfMagnitudeLimit = wordLength => 10 ** words[wordLength].length.toString().length;
export const getRandomIndex = wordLength =>
  Math.floor(Math.random() * getOrderOfMagnitudeLimit(wordLength));

export const selectNewWord = wordLength => {
  const randomIndex = getRandomIndex(wordLength);
  const modulus = words[wordLength].length - 1;
  const selectedWord = words[wordLength][randomIndex % modulus];
  return selectedWord;
};
