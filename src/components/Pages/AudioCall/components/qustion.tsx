import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { playAudio } from '..';
import { AudioCallContext } from '../context';
import Answer from './answer'


function Question() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const currentWord = quizState.words[quizState.currentQuestionIndex];
  return (
    <div>
        <IconButton aria-label="delete" 
        size="large" 
        onClick={() => { playAudio(`https://rs-lang-team-be.herokuapp.com/${currentWord.audio}`) }}
        sx={{
          width: '120px',
          height: '120px',
        }}>
         <VolumeUpIcon sx={{
          width: '100px',
          height: '100px',
        }}/>
        </IconButton>
        <div>
          {quizState.answers.map((answer) => (
            <Answer key={answer}
              answerText={answer}
              correctAnswer={currentWord.wordTranslate}
              currentAnswer={quizState.currentAnswer}
              onSelectAnswer={(answerText: string) => dispatch({ type: "SELECT_ANSWER", payload: answerText })} />
          ))}
        </div>
    </div>
  );
}

export default Question;