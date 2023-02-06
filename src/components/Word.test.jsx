import { screen } from '@testing-library/react';
import React from 'react';

import Word from './Word';

import { loseGameState, midGuessGameState, setup } from '../test-utils';

// Should have all three letter types, e.g. absent, present, and located.
const submittedWord = JSON.parse(loseGameState).previousGuesses[1];

// Should have some empty Letters as well as filled Letters.
const unsubmittedWord = JSON.parse(midGuessGameState).currentGuess;

describe('Word', () => {
  it('should be defined', () => {
    expect(Word).toBeDefined();
  });
  it('should render', () => {
    setup(<Word word={submittedWord} />);
    expect(screen.getByTestId('word-grid')).toBeInTheDocument();
  });
  it('should correctly arrange Letter components into a row', () => {
    // This also covers the 6-letter case.
    setup(<Word word={unsubmittedWord} />);
    expect(screen.getByTestId('word-grid')).toMatchSnapshot();
  });
});
