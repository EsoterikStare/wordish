import { screen } from '@testing-library/react';
import React from 'react';

import StatsDialog from './StatsDialog';

import {
  loseGameState,
  mockLocalStorage,
  newGameState,
  setup,
  winGameState,
} from '../test-utils';

const noop = () => {};

describe('StatsDialog', () => {
  it('should be defined', () => {
    expect(StatsDialog).toBeDefined();
  });
  it('should render when open is true', () => {
    setup(<StatsDialog onClose={noop} open />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('should fire provided onClose when closed', async () => {
    const onCloseSpy = jest.fn();
    const { user } = setup(<StatsDialog onClose={onCloseSpy} open />);
    await user.keyboard('{Escape}');

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });
  describe('When gameState is playing', () => {
    beforeEach(() => {
      mockLocalStorage(newGameState);
    });
    it('should display the correct heading', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('heading', { name: /Don't give up!/i })).toBeInTheDocument();
    });
    it('should have one button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
    it('should have a "new word" button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('button', { name: /new word/i })).toBeInTheDocument();
    });
    it('should look as expected', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('dialog')).toMatchSnapshot();
    });
  });
  describe('When gameState is lose', () => {
    beforeEach(() => {
      mockLocalStorage(loseGameState);
    });
    it('should display the correct heading', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('heading', { name: /That's ok! Try another!/i })).toBeInTheDocument();
    });
    it('should give the correct solution', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByText(/The word was \w{5,6}/i)).toBeInTheDocument();
    });
    it('should have one button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
    it('should have an "another!" button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('button', { name: /another!/i })).toBeInTheDocument();
    });
    it('should look as expected', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('dialog')).toMatchSnapshot();
    });
  });
  describe('When gameState is win', () => {
    beforeEach(() => {
      mockLocalStorage(winGameState);
    });
    it('should display the correct heading', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('heading', { name: /You did it!/i })).toBeInTheDocument();
    });
    it('should have two buttons', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
    it('should have a "share" button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });
    it('should have an "another!" button', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('button', { name: /another!/i })).toBeInTheDocument();
    });
    it('should look as expected', () => {
      setup(<StatsDialog onClose={noop} open />);
      expect(screen.getByRole('dialog')).toMatchSnapshot();
    });
  });
});
