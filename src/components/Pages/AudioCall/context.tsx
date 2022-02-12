import React, { createContext, useReducer } from "react";
import { IWord } from "../../../interfaces/requestsInterfaces";

interface IInitialState {
    currentQuestionIndex: number,
    words: IWord[],
    answers: string[],
    showResults: boolean,
}

interface IAction {
    type: 'NEXT_QUESTION' | 'LOADED_QUESTIONS' | 'ANSWERS';
    payload: {
      name: string;
      value: string;
    }
  }

const initialState: IInitialState = {
    currentQuestionIndex: 0,
    words: [],
    answers: [],
    showResults: false,
}

const reducer = (state: IInitialState, action: IAction) => {
    if (action.type === "NEXT_QUESTION") {
        const showResults =
        state.currentQuestionIndex === state.words.length - 1;
        const currentQuestionIndex =
        showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
        return {
            ...state,
            currentQuestionIndex,
            showResults,
        }
    }
    if (action.type === "LOADED_QUESTIONS") {
        return {
            ...state,
            words: action.payload,
        }
    }
    if (action.type === "ANSWERS") {
        return {
            ...state,
            answers: action.payload,
        }
    }
    return state;
}

export const AudioCallContext: React.Context<IInitialState> = createContext(initialState);

export function AudioCallProvider({ children }) {
    const value = useReducer(reducer, initialState)
    return (
        <AudioCallContext.Provider value={value}>{children}</AudioCallContext.Provider>
    );
}