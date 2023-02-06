import { letterStatus } from '../constants';

const { ABSENT, LOCATED, PRESENT } = letterStatus;

const getShareGrid = (state) => {
  const { colorblindMode, previousGuesses } = state;
  const squares = {
    [ABSENT]: '⬛',
    [LOCATED]: colorblindMode ? '🟦' : '🟩',
    [PRESENT]: colorblindMode ? '🟧' : '🟨',
  };

  /**
   * If I end up needing to render this somewhere, this is the way:
   *
   * https://darioghilardi.com/handling-newlines-with-react/
   */
  return previousGuesses.map((word) => word.map((letter) => squares[letter.type]).join('')).join('\r\n');
};

export default getShareGrid;
