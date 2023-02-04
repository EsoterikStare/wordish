import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Mock window.localStorage with assertable functions.
    Object.defineProperty(window, 'localStorage', {
      value: {
        clear: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('should be defined', () => {
    expect(useLocalStorage).toBeDefined();
  });
  it('should return an undefined value and no-op function if localStorage is not available', () => {
    // Overwrite mock in beforeEach with undefined window.localStorage.
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
    });

    const [value, setter] = useLocalStorage('test');

    expect(value).toBe(undefined);
    expect(typeof setter).toBe('function');
    expect(setter.toString().includes('return')).not.toBe(true);
  });
  it('should call localStorage.getItem using provided storage name', () => {
    const storageName = 'test';
    useLocalStorage(storageName);

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(storageName);
  });
  it('should call localStorage.setItem when setter is used', () => {
    const storageName = 'test';
    const [, setLocalStorage] = useLocalStorage(storageName);

    setLocalStorage({ testValue: true });

    // Logic to validate that localStorage exists calls it once before the dispatch function.
    expect(window.localStorage.setItem).toBeCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenNthCalledWith(2, storageName, {
      testValue: true,
    });
  });
});
