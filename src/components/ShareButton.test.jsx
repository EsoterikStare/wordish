import { screen } from '@testing-library/react';
import React from 'react';

import ShareButton from './ShareButton';
import { mockLocalStorage, setup, winGameState } from '../test-utils';

describe('ShareButton', () => {
  it('should be defined', () => {
    expect(ShareButton).toBeDefined();
  });
  it('should render a button', () => {
    setup(<ShareButton />);

    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });
  it('should call navigator.clipboard.writeText when clicked from a desktop or laptop', async () => {
    mockLocalStorage(winGameState);

    // Setup expected with all whitespace removed because of issues matching trailing whitespace in
    // actual writeText content.
    const expectedContent = [
      'Wordish | 4/6',
      '5-letter word',
      '🟨⬛⬛⬛⬛',
      '⬛🟩🟩⬛⬛',
      '⬛🟩🟩🟩🟩',
      '🟩🟩🟩🟩🟩',
      'https://wordish.onrender.com/?p=4f65f721',
    ].join('').replace(/\s/g, '');

    jest.spyOn(navigator.clipboard, 'writeText');

    const { user } = setup(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);

    // Also remove all whitespace from content that writeText was called with.
    const calledWithValue = navigator.clipboard.writeText.mock.calls[0][0].replace(/\s/g, '');

    // Compare both values with all whitespace removed for reliable comparison.
    expect(expectedContent).toBe(calledWithValue);
  });
});
