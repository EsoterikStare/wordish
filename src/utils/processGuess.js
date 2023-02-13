import { letterStatus } from '../constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const getOtherGuessIndices = (guessArray, guessChar) =>
  guessArray
    .map((otherGuess, guessIndex) => ({
      char: otherGuess.guessChar,
      guessIndex,
    }))
    .filter(({ char }) => char === guessChar)
    .map(({ guessIndex }) => guessIndex);

const processGuess = (guess, answer) => {
  const answerArray = answer.toLowerCase().split('');

  // To prevent a lot of array iteration, converting to an object for direct lookups.
  const answerCharSet = answerArray.reduce((acc, char) => {
    if (acc[char] && acc[char].count) {
      acc[char].count += 1;
    } else {
      acc[char] = {};
      acc[char].count = 1;
    }
    return acc;
  }, {});

  const getGuessType = ({ acc, charPresent, correctPosition, guessChar }) => {
    if (correctPosition) {
      // If this letter was guessed more times than it occurs in
      // the solution, highlight it as absent instead.
      if (answerCharSet[guessChar].guesses > answerCharSet[guessChar].count) {
        // Find other occurrences of the same letter in previous guesses
        const otherGuessIndices = getOtherGuessIndices(acc, guessChar);

        if (otherGuessIndices.length > 0) {
          // Set other non-located guesses to absent highlight.
          otherGuessIndices.forEach(guessIndex => {
            acc.splice(guessIndex, 1, { guessChar, type: ABSENT });
          });
        }

        return LOCATED;
      }
      return LOCATED;
    }

    if (charPresent) {
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

  return guess.reduce((acc, { guessChar }, index) => {
    const correctPosition = guessChar.toLowerCase() === answerArray[index];
    const charPresent = answerCharSet.hasOwnProperty(guessChar.toLowerCase());

    if (correctPosition || charPresent) {
      // Keep track of how many times this letter occurred in this guess.
      if (answerCharSet[guessChar].guesses) {
        answerCharSet[guessChar].guesses += 1;
      } else {
        answerCharSet[guessChar].guesses = 1;
      }
    }

    acc.push({
      guessChar,
      type: getGuessType({
        acc,
        charPresent,
        correctPosition,
        guessChar,
      }),
    });
    return acc;
  }, []);
};

export default processGuess;
