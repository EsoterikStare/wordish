import { screen } from '@testing-library/react';
import React from 'react';

import WordGrid from './WordGrid';

import {
  loseGameState,
  midGuessGameState,
  mockLocalStorage,
  setup,
  winGameState,
} from '../test-utils';

describe('WordGrid', () => {
  it('should be defined', () => {
    expect(WordGrid).toBeDefined();
  });
  it('should render', () => {
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toBeInTheDocument();
  });
  it('should render 42 Letter components for a 6-letter-word game', () => {
    mockLocalStorage(loseGameState);
    setup(<WordGrid />);

    expect(screen.getAllByTestId('letter-grid')).toHaveLength(42);
  });
  it('should render 30 Letter components for a 5-letter-word game', () => {
    mockLocalStorage(winGameState);
    setup(<WordGrid />);

    expect(screen.getAllByTestId('letter-grid')).toHaveLength(30);
  });
  it('should still have the correct number of Letter components after user input', async () => {
    mockLocalStorage(midGuessGameState);
    const { user } = setup(<WordGrid />);
    await user.keyboard('{Backspace}{Backspace}{Backspace}spoon');

    expect(screen.getAllByTestId('letter-grid')).toHaveLength(30);
  });
  it('should look as expected', () => {
    mockLocalStorage(loseGameState);
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toMatchSnapshot();
  });
});
