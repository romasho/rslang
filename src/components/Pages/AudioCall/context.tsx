import React, { createContext, useReducer } from "react";
import { IWord } from "../../../interfaces/requestsInterfaces";

interface IInitialState {
    currentQuestionIndex: number,
    words: IWord[],
    answers: string[],
    showResults: boolean,
    currentAnswer: string,
}

interface IAction {
    type: 'NEXT_QUESTION' | 'LOADED_QUESTIONS' | 'ANSWERS' | 'SELECT_ANSWER';
    payload:  IWord[]; 
  }

const initialState: IInitialState = {
    currentQuestionIndex: 0,
    words: [],
    answers: [],
    showResults: false,
    currentAnswer: ','
}

const reducer = (state: IInitialState, action: IAction): IInitialState => {
    switch(action.type) {
        case 'SELECT_ANSWER': {
            return {
                ...state,
                currentAnswer: action.payload,
            }
        }
        case 'NEXT_QUESTION': {
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
        case 'LOADED_QUESTIONS': {
            return {
                ...state,
                words: action.payload,
            }
        }
        case 'ANSWERS': {
            return {
                ...state,
                answers: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export const AudioCallContext: React.Context<IInitialState> = createContext(initialState);

export function AudioCallProvider({ children }) {
    const value = useReducer(reducer, initialState)
    return (
        <AudioCallContext.Provider value={value}>{children}</AudioCallContext.Provider>
    );
}