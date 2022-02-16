import { Button } from '@mui/material';
import React from 'react';
import './styles.css'


interface IAnswer {
  answerText: string,
  onSelectAnswer: any,
  currentAnswer: string,
  correctAnswer: string,
}
function Answer({ answerText, onSelectAnswer, currentAnswer, correctAnswer }: IAnswer) {
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
    const correctAnswerClass = isCorrectAnswer ? "Button-correct" : '';
    const wrongAnswerClass = isWrongAnswer ? "Button-uncorrect" : '';

    return <Button variant="contained" 
    className={`${correctAnswerClass} ${wrongAnswerClass}`}
    type='button' 
    id={answerText} 
    name="answer" 
    disabled={!!currentAnswer}
    sx={{margin: '20px 10px' }}
    onClick={() => onSelectAnswer(answerText)}>
        {answerText}
    </Button>

}

export default Answer;