import React from 'react';
import { func, shape } from 'prop-types';
import {
  Box, Grid, Menu, MenuItem, Switch, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';

import { useAppState } from '../AppStateContext';
import { words } from '../words';

const WordLengthItem = () => {
  const { state, dispatch } = useAppState();
  const { wordLength } = state;
  console.log('wordLength', { wordsKeys: Object.keys(words) });
  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={8}>
      <Grid item>
        <Typography>Word Length:</Typography>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          aria-label="word length"
          value={wordLength}
          onChange={(e, newValue) => dispatch({ type: 'updateWordLength', value: newValue || wordLength })}
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
  );
};

const ColorModeItem = () => {
  const { state, dispatch } = useAppState();
  const { colorblindMode } = state;

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={8}>
      <Grid item>
        <Typography>Colorblind Mode:</Typography>
      </Grid>
      <Grid item>
        <Switch
          aria-label="colorblind mode"
          checked={colorblindMode}
          onChange={(e, newValue) => dispatch({ type: 'updateColorblindMode', value: newValue })}
        />
      </Grid>
    </Grid>
  );
};

WordLengthItem.propTypes = {};
WordLengthItem.defaultProps = {};

const Settings = ({ anchorEl, onClose }) => (
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
    sx={{ border: '4px solid transparent' }}
  >
    <Box p={4}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <WordLengthItem />
        </Grid>
        <Grid item>
          <ColorModeItem />
        </Grid>
      </Grid>
    </Box>
  </Menu>
);

Settings.propTypes = {
  anchorEl: shape({}),
  onClose: func.isRequired
};
Settings.defaultProps = {
  anchorEl: undefined
};

export default Settings;
