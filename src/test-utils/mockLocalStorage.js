const mockLocalStorage = (gameState = {}) => {
  // Mock window.localStorage with assertable functions.
  Object.defineProperty(window, 'localStorage', {
    value: {
      clear: jest.fn(),
      // Provide a known win state from localStorage mock that will be used by AppStateProvider.
      getItem: jest.fn(() => gameState),
      removeItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });
};

export default mockLocalStorage;
