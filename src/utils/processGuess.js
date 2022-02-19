import { letterStatus } from '../constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const getOtherGuessIndices = (guessArray, guessChar) => guessArray
  .map((otherGuess, guessIndex) => ({ char: otherGuess.guessChar, guessIndex }))
  .filter(({ char }) => char === guessChar)
  .map(({ guessIndex }) => guessIndex);

const processGuess = (guess, answer) => {
  const answerArray = answer.toLowerCase().split('');
  const answerCharSet = answerArray.reduce((acc, char) => {
    if (acc[char] && acc[char].count) {
      acc[char].count += 1;
    } else {
      acc[char] = {};
      acc[char].count = 1;
    }
    return acc;
  }, {});

  // console.log('processGuess', { answer, answerCharSet });

  return guess.reduce((acc, { guessChar }, index) => {
    const correctPosition = guessChar.toLowerCase() === answerArray[index];

    const charPresent = answerArray.includes(guessChar.toLowerCase());

    const getGuessType = () => {
      if (correctPosition) {
        // Keep track of how many times this letter occurred in this guess.
        if (answerCharSet[guessChar].guesses) {
          answerCharSet[guessChar].guesses += 1;
        } else {
          answerCharSet[guessChar].guesses = 1;
        }

        if (answerCharSet[guessChar].guesses > answerCharSet[guessChar].count) {
          // If this letter was guessed more times than it occurs in
          // the solution, highlight it as absent instead.

          // Find other occurrences of the same letter in previous guesses
          const otherGuessIndices = getOtherGuessIndices(acc, guessChar);

          if (otherGuessIndices.length > 0) {
            // Set other non-located guesses to absent highlight.
            otherGuessIndices.forEach((guessIndex) => {
              acc.splice(guessIndex, 1, { guessChar, type: ABSENT });
            });
          }

          return LOCATED;
        }
        return LOCATED;
      }

      if (charPresent) {
        // Keep track of how many times this letter occurred in this guess.
        if (answerCharSet[guessChar].guesses) {
          answerCharSet[guessChar].guesses += 1;
        } else {
          answerCharSet[guessChar].guesses = 1;
        }
        if (answerCharSet[guessChar].guesses > answerCharSet[guessChar].count) {
          // If this letter was guessed more times than it occurs in
          // the solution, highlight it as absent instead.
          return ABSENT;
        }
        // Otherwise, highight as present normally.
        return PRESENT;
      }

      // If the letter is neither present nor located, highlight it as absent.
      return ABSENT;
    };
    acc.push({ guessChar, type: getGuessType() });
    return acc;
  }, []);
};

export default processGuess;
