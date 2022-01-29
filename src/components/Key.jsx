import React from "react";
import { createUseStyles } from "react-jss";

import { useAppState } from "../AppStateContext";
import { colorMap } from "../constants";

const useStyles = createUseStyles({
  keyWrapper: {
    alignItems: "center",
    backgroundColor: ({ state }) => colorMap[state] || "#555555",
    borderRadius: 4,
    color: "white",
    display: "flex",
    fontSize: 20,
    fontFamily: "sans-serif",
    height: 50,
    justifyContent: "center",
    margin: 3,
    width: 35,
    cursor: "pointer",
    userSelect: "none"
  }
});

const Key = ({ label, guessedLetters }) => {
  const { dispatch } = useAppState();
  const handleClick = () => {
    dispatch({ type: "add", value: label });
  };
  const { keyWrapper } = useStyles({
    state: guessedLetters[label.toLowerCase()]
  });
  return (
    <div
      aria-label={label}
      role="button"
      className={keyWrapper}
      onClick={handleClick}
    >
      {label.toUpperCase()}
    </div>
  );
};

export default Key;
