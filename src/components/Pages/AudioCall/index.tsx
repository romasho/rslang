import { Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { IWord } from '../../../interfaces/requestsInterfaces';
import { getWords } from '../../../utils/services';
import Game from './components/game';
import { AudioCallContext } from './context';

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
    dispatch({type: "ANSWERS", payload: arrResponse})
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
    <div>
      {isDataLoaded ?
        (
          <Game />
        )
        :
        (<><h2>Аудиовызов</h2>
          <p>Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.</p>
          <div>
            {LEVELS.map(el => <Button variant="outlined" onClick={() => {
                getWords(el, Math.floor(Math.random() * 30)).then(elem => {
                  dispatch({type: "LOADED_QUESTIONS", payload: elem})
                  setIsDataLoaded(true);
                });
              }}>{el + 1}</Button>)}
          </div></>)
      }
    </div>
  );
}

export default AudioCall;