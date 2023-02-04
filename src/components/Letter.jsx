import React from 'react';
import { string } from 'prop-types';
import { Grid, styled } from '@mui/material';

/**
 * TODO: Add little "pop" animation when adding a letter
 * TODO: Add card flip animation on submit
 */
const StyledDiv = styled('div')(({ theme, type }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.letterStatus[type],
  border: '2px solid',
  borderColor: type ? 'transparent' : '#333',
  borderRadius: 2,
  color: 'white',
  display: 'flex',
  fontSize: 32,
  fontFamily: 'sans-serif',
  height: 50,
  justifyContent: 'center',
  width: 50,
  userSelect: 'none',
}));

const Letter = ({ guessChar, type }) => (
  <Grid id="letter-grid" item>
    <StyledDiv type={type}>{guessChar.toUpperCase()}</StyledDiv>
  </Grid>
);

Letter.propTypes = {
  guessChar: string.isRequired,
  type: string,
};

Letter.defaultProps = {
  type: undefined,
};

export default Letter;
