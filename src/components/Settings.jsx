import React from 'react';
import { object, func, number } from 'prop-types';
import {
  Grid, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';

import { useAppState } from '../AppStateContext';
import { words } from '../words';

const WordLengthItem = () => {
  const { state, dispatch } = useAppState();
  const { wordLength } = state;
  console.log('wordLength', { wordsKeys: Object.keys(words) });
  return (
    <MenuItem>
      <Grid alignItems="center" container justifyContent="space-around" spacing={8}>
        <Grid item>
          <Typography>Word Length:</Typography>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            aria-label="word length"
            value={wordLength}
            onChange={(e, newValue) => dispatch({ type: 'updateWordLength', value: newValue })}
            exclusive
          >
            {Object.keys(words).map((length, index) => (
              <ToggleButton key={index.toString()} value={parseInt(length, 10)} aria-label={length}>
                {length}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

WordLengthItem.propTypes = {};
WordLengthItem.defaultProps = {};

const Settings = ({ anchorEl, onClose }) => {
  const { state } = useAppState();
  const { wordLength } = state;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      onClose={onClose}
      open={Boolean(anchorEl)}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
    >
      <WordLengthItem wordLength={wordLength} />
    </Menu>
  );
};

Settings.propTypes = {
  anchorEl: object,
  onClose: func.isRequired
};
Settings.defaultProps = {
  anchorEl: undefined
};

export default Settings;
