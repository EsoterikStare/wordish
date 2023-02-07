import { newGameState } from './gameStates';

const mockLocalStorage = (gameState = newGameState) => {
  const originalLocalStorage = { ...window.localStorage };
  const mockValues = {
    clear: jest.fn(),
    // Provide a known win state from localStorage mock that will be used by AppStateProvider.
    getItem: jest.fn(() => gameState),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };

  // Mock window.localStorage with assertable functions.
  Object.defineProperty(window, 'localStorage', {
    value: mockValues,
    writable: true,
  });

  const resetLocalStorage = () => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
  };

  return {
    resetLocalStorage,
    ...mockValues,
  };
};

export default mockLocalStorage;
