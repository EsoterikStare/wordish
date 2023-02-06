import { screen } from '@testing-library/react';
import React from 'react';

import Letter from './Letter';

import { setup } from '../test-utils';
import { letterStatus } from '../constants';

describe('Letter', () => {
  it('should be defined', () => {
    expect(Letter).toBeDefined();
  });
  it('should render', () => {
    setup(<Letter guessChar="a" />);
    expect(screen.getByText(/a/i)).toBeInTheDocument();
  });
  it('should always render a capital letter', () => {
    setup(<Letter guessChar="a" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
  it('should look correct for a guessed value', () => {
    setup(<Letter guessChar="a" />);
    expect(screen.getByTestId('letter-grid')).toMatchSnapshot();
  });
  it('should look correct for an absent value', () => {
    setup(<Letter guessChar="a" type={letterStatus.ABSENT} />);
    expect(screen.getByTestId('letter-grid')).toMatchSnapshot();
  });
  it('should look correct for an present value', () => {
    setup(<Letter guessChar="a" type={letterStatus.PRESENT} />);
    expect(screen.getByTestId('letter-grid')).toMatchSnapshot();
  });
  it('should look correct for an located value', () => {
    setup(<Letter guessChar="a" type={letterStatus.LOCATED} />);
    expect(screen.getByTestId('letter-grid')).toMatchSnapshot();
  });
});
