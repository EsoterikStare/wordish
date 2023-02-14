import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { node } from 'prop-types';
import React from 'react';

import { AppStateProvider } from '../AppStateContext';
import AppThemeProvider from '../AppThemeProvider';

const Wrapper = ({ children }) => (
  <AppStateProvider>
    <AppThemeProvider>{children}</AppThemeProvider>
  </AppStateProvider>
);
Wrapper.propTypes = {
  children: node.isRequired,
};
Wrapper.defaultProps = {};

const setup = jsx => {
  const { rerender, ...rest } = render(<Wrapper>{jsx}</Wrapper>);
  return {
    user: userEvent.setup(),
    rerender: newJsx => rerender(<Wrapper>{newJsx}</Wrapper>),
    ...rest,
  };
};

export default setup;
