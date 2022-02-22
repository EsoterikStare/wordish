import React from 'react';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useAppState } from './AppStateContext';
import { Header, Keyboard, WordGrid } from './components';

const App = () => {
  const { state, dispatch } = useAppState();
  const [searchParams] = useSearchParams();

  const { id } = state;
  const idParam = searchParams.get('p');

  if (id !== idParam) {
    dispatch({ type: 'updatePuzzleId', value: idParam });
  }

  const handleKeyDown = (e) => {
    const alpha = /[a-zA-Z]/;
    if (e.key.length === 1 && alpha.test(e.key)) {
      dispatch({ type: 'add', value: e.key });
    }
    if (e.key === 'Backspace') {
      dispatch({ type: 'remove' });
    }
    if (e.key === 'Enter') {
      dispatch({ type: 'submit' });
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Grid alignItems="center" container flexDirection="column" justifyContent="space-around" sx={{ backgroundColor: '#151515', height: '100vh' }}>
      <Header title="WORDISH" />
      <WordGrid />
      <Keyboard />
    </Grid>
  );
};

export default App;
