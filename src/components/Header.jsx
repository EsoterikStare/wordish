import React from "react";
import { createUseStyles } from "react-jss";
import { RefreshCcw, Settings } from "react-feather";

import { useAppState } from "../AppStateContext";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    borderBottom: "2px solid #333333",
    width: "100%",
    justifyContent: "space-between",
    // padding: 8,
    margin: 8
  },
  headerTitle: {
    fontSize: 40,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "white",
    userSelect: "none"
  },
  actionButton: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 4,
    margin: "0px 8px",
    color: "white",
    cursor: "pointer",
    userSelect: "none"
  },
  rightSideHeader: {
    display: "flex",
    justifyContent: "end"
  },
  leftSideHeader: {
    display: "flex",
    justifyContent: "start"
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
  return (
    <div className={root}>
      <div className={leftSideHeader}>
        <div
          aria-label="reset"
          role="button"
          className={actionButton}
          onClick={() => dispatch({ type: "reset" })}
        >
          <RefreshCcw />
        </div>
      </div>
      <div role="heading" className={headerTitle}>
        {title}
      </div>
      <div className={rightSideHeader}>
        <div
          aria-label="settings"
          role="button"
          className={actionButton}
          onClick={() => alert("Settings coming soon...")}
        >
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Header;
