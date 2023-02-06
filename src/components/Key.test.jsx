import { screen } from '@testing-library/react';
import React from 'react';

import Key from './Key';

import { setup } from '../test-utils';
import { letterStatus } from '../constants';

describe('Key', () => {
  it('should be defined', () => {
    expect(Key).toBeDefined();
  });
  it('should render', () => {
    setup(<Key label="a" guessedLetters={{}} />);
    expect(screen.getByRole('button', { name: /a/i })).toBeInTheDocument();
  });
  it('should always render a capital letter', () => {
    setup(<Key label="a" guessedLetters={{}} />);
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
  });
  it('should look correct for a guessed value', () => {
    setup(<Key label="a" guessedLetters={{}} />);
    expect(screen.getByRole('button', { name: /a/i })).toMatchSnapshot();
  });
  it('should look correct for an absent value', () => {
    setup(<Key label="a" guessedLetters={{ a: letterStatus.ABSENT }} />);
    expect(screen.getByRole('button', { name: /a/i })).toMatchSnapshot();
  });
  it('should look correct for an present value', () => {
    setup(<Key label="a" guessedLetters={{ a: letterStatus.PRESENT }} />);
    expect(screen.getByRole('button', { name: /a/i })).toMatchSnapshot();
  });
  it('should look correct for an located value', () => {
    setup(<Key label="a" guessedLetters={{ a: letterStatus.LOCATED }} />);
    expect(screen.getByRole('button', { name: /a/i })).toMatchSnapshot();
  });
});
