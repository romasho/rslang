import React, { useContext } from 'react';
import { playAudio } from '..';
import { AudioCallContext } from '../context';
import Answer from './answer'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton } from '@mui/material';

function Question() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const currentWord = quizState.words[quizState.currentQuestionIndex];
  return (
    <div>
        <IconButton aria-label="delete" size="large" onClick={() => { playAudio(`https://rs-lang-team-be.herokuapp.com/${currentWord.audio}`) }}>
         <VolumeUpIcon size="large" />
        </IconButton>
        <div>
          {quizState.answers.map((answer) => (
            <Answer key={answer}
              answerText={answer}
              correctAnswer={currentWord.wordTranslate}
              currentAnswer={quizState.currentAnswer}
              onSelectAnswer={(answerText) => dispatch({ type: "SELECT_ANSWER", payload: answerText })} />
          ))}
        </div>
    </div>
  );
}

export default Question;