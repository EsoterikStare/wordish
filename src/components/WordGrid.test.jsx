import { screen } from '@testing-library/react';
import React from 'react';

import WordGrid from './WordGrid';

import { loseGameState, setup } from '../test-utils';

describe('WordGrid', () => {
  it('should be defined', () => {
    expect(WordGrid).toBeDefined();
  });
  it('should render', () => {
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toBeInTheDocument();
  });
  it('should correctly arrange Word components in a vertical stack', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        clear: jest.fn(),
        // Provide a new game state from localStorage mock that will be used by AppStateProvider.
        getItem: jest.fn(() => loseGameState),
        removeItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toMatchSnapshot();
  });
});
