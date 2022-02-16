import { Button, Grid, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { IWord } from '../../../interfaces/requestsInterfaces';
import { getWords } from '../../../utils/services';
import Game from './components/game';
import { AudioCallContext } from './context';
import { StylesToggleButton } from '../../DifficultySelector';

const LEVELS = [0, 1, 2, 3, 4, 5];
const audioPlayer = new Audio();
audioPlayer.volume = 0.1;

export function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}

function AudioCall() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
            <Grid item xs="auto" sm={6} md={6}>
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
            Audiocall training develops vocabulary. You have to choose the translation of the word you heard.
          </Typography>
          <Typography variant='h5' sx={{ fontFamily: 'Bebas Neue', color: 'white' }}>
            Select difficulty level
          </Typography>
          <ToggleButtonGroup
            exclusive
            sx={{
              fontSize: 240,
              backdropFilter: 'blur(5px)'
            }}
          >
            {LEVELS.map(el => <StylesToggleButton value={el}
              onClick={() => {
                getWords(el, Math.floor(Math.random() * 30)).then(elem => {
                  dispatch({ type: "LOADED_QUESTIONS", payload: elem })
                  setIsDataLoaded(true)});
              }}>
              {el + 1}
            </StylesToggleButton>)}
          </ToggleButtonGroup>
        </Grid>)
      }
    </Grid>
  );
}

export default AudioCall;