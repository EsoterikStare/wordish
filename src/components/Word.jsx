import React from "react";
import { createUseStyles } from "react-jss";

import Letter from "./Letter";

const useStyles = createUseStyles({
  wordElement: {
    display: "flex"
  }
});

const Word = ({ word }) => {
  const { wordElement } = useStyles();
  return (
    <div className={wordElement}>
      {word.map((letterProps, index) => {
        return <Letter key={index.toString()} {...letterProps} />;
      })}
    </div>
  );
};

export default Word;
