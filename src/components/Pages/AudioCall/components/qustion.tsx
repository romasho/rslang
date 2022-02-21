import React, { useContext } from 'react';
import { Box, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AudioCallContext } from '../context';
import Answer from './answer'
import { playAudio } from '../../../../utils/miscellaneous';


function Question() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const currentWord = quizState.words[quizState.currentQuestionIndex];
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IconButton aria-label='delete' 
        size='large' 
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
        <Box sx={{
          display: 'flex',
          maxWidth: { xs: '90%', sm: '100%' },
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {quizState.answers.map((answer) => (
            <Answer key={answer}
              answerText={answer}
              correctAnswer={currentWord.wordTranslate}
              currentAnswer={quizState.currentAnswer}
              onSelectAnswer={(answerText: string) => dispatch({ type: 'SELECT_ANSWER', payload: answerText })} />
          ))}
        </Box>
    </Box>
  );
}

export default Question;