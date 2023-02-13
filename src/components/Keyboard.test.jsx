import { screen } from '@testing-library/react';
import React from 'react';

import Keyboard from './Keyboard';

import { loseGameState, mockLocalStorage, newGameState, setup, winGameState } from '../test-utils';

describe('Keyboard', () => {
  it('should be defined', () => {
    expect(Keyboard).toBeDefined();
  });
  it('should render', () => {
    setup(<Keyboard />);
    expect(screen.getByTestId('keyboard-grid')).toBeInTheDocument();
  });
  it('should look the same for a new game state', () => {
    const { resetLocalStorage } = mockLocalStorage(newGameState);
    setup(<Keyboard />);
    expect(screen.getByTestId('keyboard-grid')).toMatchSnapshot();
    resetLocalStorage();
  });
  it('should look the same for a lose game state', () => {
    const { resetLocalStorage } = mockLocalStorage(loseGameState);
    setup(<Keyboard />);
    expect(screen.getByTestId('keyboard-grid')).toMatchSnapshot();
    resetLocalStorage();
  });
  it('should look the same for a win game state', () => {
    const { resetLocalStorage } = mockLocalStorage(winGameState);
    setup(<Keyboard />);
    expect(screen.getByTestId('keyboard-grid')).toMatchSnapshot();
    resetLocalStorage();
  });
});
