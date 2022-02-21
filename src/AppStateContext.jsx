import React from 'react';
import { node } from 'prop-types';
import { format } from 'date-fns';

import { selectNewWord } from './words';
import { generateDailyIds, useLocalStorage } from './utils';
import appStateReducer from './appStateReducer';

const AppStateContext = React.createContext();

const AppStateProvider = ({ children }) => {
  const [storedState, setStoredState] = useLocalStorage('appState', { parse: JSON.parse });

  const {
    colorblindMode: storedColorblindMode,
    currentGuess: storedCurrentGuess,
    solution: storedSolution,
    maxGuesses: storedMaxGuesses,
    wordLength: storedWordLength,
    previousGuesses: storedPreviousGuesses,
    gameState: storedGameState,
    daily: storedDaily,
    id: storedId
  } = storedState || {};

  const [state, dispatch] = React.useReducer(appStateReducer, {
    colorblindMode: storedColorblindMode || false,
    currentGuess: storedCurrentGuess || [],
    solution: storedSolution || selectNewWord(storedWordLength || 5),
    maxGuesses: storedMaxGuesses || (storedWordLength && storedWordLength + 1) || 6,
    wordLength: storedWordLength || 5,
    previousGuesses: storedPreviousGuesses || [],
    gameState: storedGameState || 'playing',
    daily: storedDaily || {
      date: '',
      fiveLetterId: '',
      sixLetterId: ''
    },
    id: storedId || ''
  });

  React.useEffect(() => {
    // Observer to keep localStorage in sync
    setStoredState(JSON.stringify(state));
  }, [state]);

  const value = React.useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);

  const nowDate = format(new Date(), 'yyyyMMdd');
  if (state.daily.date !== nowDate) {
    dispatch({ type: 'updateDailyPuzzles', value: generateDailyIds(nowDate) });
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: node.isRequired
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
