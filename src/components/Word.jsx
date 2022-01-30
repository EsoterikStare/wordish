import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Grid } from '@mui/material';

import Letter from './Letter';

/**
 * TODO: Add shiver animation on non-word submit
 */
const Word = ({ word }) => (
  <Grid container item spacing={1}>
    {word.map(({ guessChar, type }, index) => (
      <Letter key={index.toString()} guessChar={guessChar} type={type} />
    ))}
  </Grid>
);

Word.propTypes = {
  word: arrayOf(shape({ guessChar: string, type: string })).isRequired
};

export default Word;
