import React from "react";

import { selectNewWord } from "./words";

const AppStateContext = React.createContext();

const processGuess = (guess, answer) => {
  const answerArray = answer.toLowerCase().split("");
  return guess.reduce((acc, { guessChar }, index) => {
    const correctPosition = guessChar.toLowerCase() === answerArray[index];
    const charPresent = answerArray.includes(guessChar.toLowerCase());
    const getGuessType = () => {
      // TODO: Make these guess types a constant and reference them everywhere.
      if (correctPosition) return "located";
      if (charPresent) return "present";
      return "absent";
    };
    acc.push({ guessChar, type: getGuessType() });
    return acc;
  }, []);
};

const userInputReducer = (state, { type, value }) => {
  switch (type) {
    case "add": {
      if (
        state.currentGuess.length < state.wordLength &&
        state.gameState === "playing"
      ) {
        return {
          ...state,
          currentGuess: [...state.currentGuess, { guessChar: value }]
        };
      }
      return state;
    }
    case "remove": {
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, state.currentGuess.length - 1) // remove last index
      };
    }
    case "submit": {
      if (state.currentGuess.length === state.wordLength) {
        const guess = state.currentGuess
          .map(({ guessChar }) => guessChar)
          .join("")
          .toLowerCase();
        const answer = state.secretWord.toLowerCase();

        // check guess and either end game or set guess colors and
        // setup next guess.
        if (guess === answer) {
          // correct/win!
          return {
            ...state,
            currentGuess: "",
            gameState: "win",
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.secretWord)
            ]
          };
        } else if (state.previousGuesses.length + 1 === state.maxGuesses) {
          // wrong/out of guesses/lose!
          return {
            ...state,
            currentGuess: "",
            gameState: "lose",
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.secretWord)
            ]
          };
        } else {
          // wrong/next guess!
          return {
            ...state,
            currentGuess: "",
            previousGuesses: [
              ...state.previousGuesses,
              processGuess(state.currentGuess, state.secretWord)
            ]
          };
        }
      }
      return state;
    }
    case "reset": {
      return {
        ...state,
        currentGuess: [],
        gameState: "playing",
        previousGuesses: [],
        secretWord: selectNewWord(state.wordLength)
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userInputReducer, {
    currentGuess: [],
    secretWord: selectNewWord(6),
    maxGuesses: 7,
    wordLength: 6,
    previousGuesses: [],
    gameState: "playing"
  });
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

export { AppStateProvider, useAppState };
