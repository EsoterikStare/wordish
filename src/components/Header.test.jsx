import { screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';
import { mockLocalStorage, setup, winGameState } from '../test-utils';

describe('Header', () => {
  it('should be defined', () => {
    expect(Header).toBeDefined();
  });
  it('should render', () => {
    setup(<Header title="WORDISH" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  it('should render a heading with the given title prop text', () => {
    const title = 'WORDISH';
    setup(<Header title={title} />);

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });
  it("should have it's components arranged correctly", () => {
    setup(<Header title="WORDISH" />);
    expect(screen.getByRole('banner')).toMatchSnapshot();
  });
  it('should open the StatsDialog when gameState is not "playing"', () => {
    const { resetLocalStorage } = mockLocalStorage(winGameState);
    setup(<Header title="WORDISH" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    resetLocalStorage();
  });
  describe('Stats button', () => {
    it('should render', () => {
      setup(<Header title="WORDISH" />);
      expect(screen.getByRole('button', { name: 'Stats and Share' })).toBeInTheDocument();
    });
    it('should open a dialog when clicked', async () => {
      const { user } = setup(<Header title="WORDISH" />);
      await user.click(screen.getByRole('button', { name: 'Stats and Share' }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
  describe('Settings button', () => {
    it('should render', () => {
      setup(<Header title="WORDISH" />);
      expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    });
    it('should open a menu when clicked', async () => {
      const { user } = setup(<Header title="WORDISH" />);
      await user.click(screen.getByRole('button', { name: 'Settings' }));

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });
});
