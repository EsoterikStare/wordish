import { screen } from '@testing-library/react';
import React from 'react';

import WordGrid from './WordGrid';

import { loseGameState, mockLocalStorage, setup } from '../test-utils';

describe('WordGrid', () => {
  it('should be defined', () => {
    expect(WordGrid).toBeDefined();
  });
  it('should render', () => {
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toBeInTheDocument();
  });
  it('should correctly arrange Word components in a vertical stack', () => {
    mockLocalStorage(loseGameState);
    setup(<WordGrid />);
    expect(screen.getByTestId('words-grid')).toMatchSnapshot();
  });
});
