import React from 'react';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';
import { RefreshCcw, Settings } from 'react-feather';

import { useAppState } from '../AppStateContext';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    borderBottom: '2px solid #333333',
    width: '100%',
    justifyContent: 'space-between',
    // padding: 8,
    margin: 8
  },
  headerTitle: {
    fontSize: 40,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'white',
    userSelect: 'none'
  },
  actionButton: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 4,
    margin: '0px 8px',
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none'
  },
  rightSideHeader: {
    display: 'flex',
    justifyContent: 'end'
  },
  leftSideHeader: {
    display: 'flex',
    justifyContent: 'start'
  }
});

const Header = ({ title }) => {
  const {
    root,
    headerTitle,
    actionButton,
    rightSideHeader,
    leftSideHeader
  } = useStyles();
  const { dispatch } = useAppState();
  const dispatchResetAction = () => dispatch({ type: 'reset' });
  const handleResetKeyDown = (e) => {
    const actionKeys = [' ', 'Enter'];
    if (actionKeys.includes(e.key)) {
      dispatchResetAction();
    }
  };
  return (
    <div className={root}>
      <div className={leftSideHeader}>
        <div
          aria-label="reset"
          role="button"
          className={actionButton}
          onClick={dispatchResetAction}
          onKeyDown={handleResetKeyDown}
          tabIndex={0}
        >
          <RefreshCcw />
        </div>
      </div>
      <div role="heading" aria-level={1} className={headerTitle}>
        {title}
      </div>
      <div className={rightSideHeader}>
        <div
          aria-label="settings"
          role="button"
          className={actionButton}
          // eslint-disable-next-line no-alert
          onClick={() => alert('Settings coming soon...')}
          onKeyDown={(e) => {
            const actionKeys = [' ', 'Enter'];
            if (actionKeys.includes(e.key)) {
              // eslint-disable-next-line no-alert
              alert('Settings coming soon...');
            }
          }}
          tabIndex={0}
        >
          <Settings />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: string.isRequired
};

export default Header;
