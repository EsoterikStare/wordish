import { letterStatus } from '../constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

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
    /**
     * TODO: Correctly color as absent when all instances of a present
     * or located letter are already accounted for
     */
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
    console.log('processGuess reducer', { answerCharSet, guessChar, acc });
    return acc;
  }, []);
};

export default processGuess;
