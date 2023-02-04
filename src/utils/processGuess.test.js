import processGuess from './processGuess';

const strToGuessObj = str => str.split('').map(char => ({ guessChar: char }));

describe('processGuess', () => {
  it('should be defined', () => {
    expect(processGuess).toBeDefined();
  });
  it('should return an array of objects containing the keys "guessChar" and "type"', () => {
    const result = processGuess(strToGuessObj('test'), 'test');

    const hasCorrectKeys = resultArr => resultArr.every(obj => obj.hasOwnProperty('guessChar') && obj.hasOwnProperty('type'));
    expect(hasCorrectKeys(result)).toBe(true);
  });
  it('should return type of "located" when the guessChar position matches the answer character in that same position', () => {
    const result = processGuess(strToGuessObj('testy'), 'testy');
    expect(result.every(({ type }) => type === 'located')).toBe(true);
  });
  it('should return type of "present" when the guessChar is in the answer, but not at the same position', () => {
    const result = processGuess(strToGuessObj('tsety'), 'testy');
    expect(result.map(({ type }) => type)).toStrictEqual(['located', 'present', 'present', 'located', 'located']);
  });
  it('should return type of "absent" when the guessChar is not in the answer at all', () => {
    const result = processGuess(strToGuessObj('tsaty'), 'testy');
    expect(result.map(({ type }) => type)).toStrictEqual(['located', 'present', 'absent', 'located', 'located']);
  });
  it('should return type of "absent" when a character is guessed more times than it is present in the answer', () => {
    const result = processGuess(strToGuessObj('ttset'), 'testy');
    expect(result.map(({ type }) => type)).toStrictEqual(['located', 'present', 'located', 'present', 'absent']);
  });
  it('should correctly set an earlier guessChar to type "absent" when that same character is "located" later in the guess', () => {
    const result = processGuess(strToGuessObj('ytsey'), 'testy');
    expect(result.map(({ type }) => type)).toStrictEqual(['absent', 'present', 'located', 'present', 'located']);
  });
});
