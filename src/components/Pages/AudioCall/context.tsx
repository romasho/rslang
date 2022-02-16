import React, { createContext, useReducer } from "react";
import { IWord } from "../../../interfaces/requestsInterfaces";

export interface IInitialState {
    currentQuestionIndex: number,
    words: IWord[],
    answers: string[],
    showResults: boolean,
    currentAnswer: string,
    usersAnswers: boolean[]
}

interface IAction {
    type: 'NEXT_QUESTION' | 'LOADED_QUESTIONS' | 'ANSWERS' | 'SELECT_ANSWER';
    payload: any;
}

const initialState: IInitialState = {
    currentQuestionIndex: 0,
    words: [],
    answers: [],
    showResults: false,
    currentAnswer: '',
    usersAnswers: [],
}

const reducer = (state: IInitialState, action: IAction): IInitialState => {
    switch (action.type) {
        case 'SELECT_ANSWER': {
            
            if (action.payload === state.words[state.currentQuestionIndex].wordTranslate) {
                return {
                    ...state,
                    currentAnswer: action.payload,
                    usersAnswers: [...state.usersAnswers, true]
                }
            }
            return {
                ...state,
                currentAnswer: action.payload,
                usersAnswers: [...state.usersAnswers, false]
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
                currentAnswer: '',
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

export const AudioCallContext = createContext<[
    state: IInitialState,
    dispatch: React.Dispatch<any>
]>([initialState, () => null]);

type Props = {
    children: React.ReactNode
};

export function AudioCallProvider({ children }: Props) {
    const state = useReducer(reducer, initialState)
    return (
        <AudioCallContext.Provider value={state}>
            {children}
        </AudioCallContext.Provider>
    );
}