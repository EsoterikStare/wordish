import React from 'react';
import { createUseStyles } from 'react-jss';

import { useAppState } from './AppStateContext';
import { Header, Word, Keyboard } from './components';

const useStyles = createUseStyles({
  // TODO: Work on overall layout so it's more responsive and correct
  appWrapper: {
    backgroundColor: '#151515',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 415,
    width: '100%',
    height: '100%'
  },
  wordTilesWrapper: {
    margin: 24
  }
});

const App = () => {
  const { state, dispatch } = useAppState();
  const { appWrapper, wordTilesWrapper } = useStyles();
  console.log('current state', { state, answer: state.secretWord });

  const handleKeyDown = (e) => {
    const alpha = /[a-zA-z]/;
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

  // Empty words set based on current settings
  const getWordsTemplate = () => Array(state.maxGuesses).fill(
    Array(state.wordLength).fill({ guessChar: '' })
  );

  // Empty words templates merged with previous guesses and current guess
  const getWords = () => getWordsTemplate().reduce((wordAcc, emptyWord, wordIndex) => {
    // Merge empty words with previous guesses and current guesses
    if (wordIndex < state.previousGuesses.length) {
      // Insert previous guesses at word indexes where those exist
      wordAcc.push(state.previousGuesses[wordIndex]);
    } else if (wordIndex === state.previousGuesses.length) {
      // Insert the characters of the current guess at the index after the last previous guess.
      const mergedGuess = emptyWord.reduce((mergeAcc, emptyChar, letterIndex) => {
        mergeAcc.push(state.currentGuess[letterIndex] || emptyChar);
        return mergeAcc;
      }, []);
      wordAcc.push(mergedGuess);
    } else {
      // Fill up the remaining words with empty placeholders
      wordAcc.push(emptyWord);
    }
    return wordAcc;
  }, []);

  return (
    <div className={appWrapper}>
      <Header title="WORDISH" />
      <div className={wordTilesWrapper}>
        {getWords().map((word, index) => (
          <Word key={index.toString()} word={word} />
        ))}
      </div>
      <Keyboard />
    </div>
  );
};

export default App;
