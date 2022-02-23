import { Button } from '@mui/material';
import React from 'react';
import './styles.css'


interface IAnswer {
  answerText: string,
  onSelectAnswer: any,
  currentAnswer: string,
  correctAnswer: string,
  index: number,
}
function Answer({ answerText, onSelectAnswer, currentAnswer, correctAnswer, index }: IAnswer) {
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
    const correctAnswerClass = isCorrectAnswer ? "Button-correct" : '';
    const wrongAnswerClass = isWrongAnswer ? "Button-uncorrect" : '';

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === `${index + 1}` && !currentAnswer) {
        onSelectAnswer(answerText);
      }
    }

    React.useEffect(() => {
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      }
    }, [index, onSelectAnswer]);


    return <Button variant="contained" 
    className={`${correctAnswerClass} ${wrongAnswerClass}`}
    type='button' 
    id={answerText} 
    name="answer" 
    disabled={!!currentAnswer}
    sx={{margin: '20px 10px', minWidth: { xs: "40%", sm: "64px" } }}
    onClick={() => onSelectAnswer(answerText)}>
        {`${index + 1}. ${answerText}`}
    </Button>

}

export default Answer;