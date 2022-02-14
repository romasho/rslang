import { Button } from '@mui/material';
import React from 'react';

function Answer({ answerText, onSelectAnswer, currentAnswer, correctAnswer }) {
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
    (console.log(isCorrectAnswer, isWrongAnswer))

    return <Button variant="contained" type='button' id={answerText} name="answer"  onClick={() => onSelectAnswer(answerText)}>{answerText}</Button>

}

export default Answer;