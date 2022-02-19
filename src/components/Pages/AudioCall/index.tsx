import { Button, Grid, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { IWord } from '../../../interfaces/requestsInterfaces';
import { getWords } from '../../../utils/services';
import Game from './components/game';
import { AudioCallContext } from './context';
import DifficultySelector from '../../DifficultySelector';
import playAudio from '../../../utils/miscellaneous';

function AudioCall() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState('1');

  const handleDifficultyChange = (value: string) => {
    setSelectedValue(value);
  };

  const getResponseOptions = (randomWord: IWord) => {
    let arrResponse: any = [randomWord?.wordTranslate];
    for (let i = 0; i < 3; i += 1) {
      let randomResponse = quizState.words[Math.floor(Math.random() * quizState.words.length)];
      while (arrResponse.includes(randomResponse.wordTranslate)) {
        randomResponse = quizState.words[Math.floor(Math.random() * quizState.words.length)];
      }
      arrResponse = [...arrResponse, randomResponse.wordTranslate];
    }
    arrResponse.sort(() => Math.random() - 0.5);
    dispatch({ type: "ANSWERS", payload: arrResponse })
  };

  useEffect(() => {
    if (isDataLoaded) {
      playAudio(`https://rs-lang-team-be.herokuapp.com/${quizState.words[quizState.currentQuestionIndex].audio}`);
      getResponseOptions(quizState.words[quizState.currentQuestionIndex])
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {

      playAudio(`https://rs-lang-team-be.herokuapp.com/${quizState.words[quizState.currentQuestionIndex].audio}`);
      getResponseOptions(quizState.words[quizState.currentQuestionIndex])
    }
  }, [quizState.currentQuestionIndex]);

  return (
    <Grid container sx={{
      flexGrow: 1,
      backgroundImage: 'url(forest-blue-bg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      mixBlendMode: 'multiply',
    }}>
      {isDataLoaded ?
        (
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs="auto" sm={11} md={6}>
              <Game />
            </Grid>
          </Grid>
        )
        :
        (<Grid container sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography component='h1' variant='h1' sx={{ mb: 10, fontFamily: 'Permanent Marker' }}>
            Audiocall
          </Typography>
          <Typography sx={{ mb: 10, fontSize: 32, fontFamily: 'Bebas Neue' }}>
            Audiocall training develops vocabulary. <br/> You have to choose the translation of the word you heard.
          </Typography>
          <DifficultySelector onChange={handleDifficultyChange} selectedValue={selectedValue} />
          <Button variant='contained'
            onClick={() => {
              getWords(+selectedValue - 1, Math.floor(Math.random() * 30)).then(elem => {
                dispatch({ type: "LOADED_QUESTIONS", payload: elem })
                setIsDataLoaded(true)});
            }}
            sx={{ 
              mt: 10, 
              fontSize: 24, 
              fontWeight: 'bold', 
              bgcolor: 'background.default', 
              fontFamily: 'Bebas Neue', 
              letterSpacing: 3  
            }}>
            Start game
          </Button>
          
        </Grid>)
      }
    </Grid>
  );
}

export default AudioCall;
