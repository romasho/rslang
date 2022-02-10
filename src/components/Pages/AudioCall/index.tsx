import React, { useState, useEffect } from 'react';
import { IWord } from '../../../interfaces/requestsInterfaces';
import { getWords } from '../../../utils/services';


const LEVELS = [0, 1, 2, 3, 4, 5];

const audioPlayer = new Audio();
audioPlayer.volume = 0.1;

function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}


function AudioCall() {
  const [words, setWords] = useState<IWord[] | []>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentWord, setcurrentWord] = useState(0);
  const [responseOptions, setResponseOptions] = useState<string[]>([]);

  const getResponseOptions = (randomWord: IWord) => {
    let arrResponse: any = [randomWord?.wordTranslate];
    for (let i = 0; i < 3; i += 1) {
      let randomResponse = words[Math.floor(Math.random() * words.length)];
      while (arrResponse.includes(randomResponse.wordTranslate)) {
        randomResponse = words[Math.floor(Math.random() * words.length)];
      }
      arrResponse = [...arrResponse, randomResponse.wordTranslate];
    }
    arrResponse.sort(() => Math.random() - 0.5);
    setResponseOptions(arrResponse);
  };

  useEffect(() => {
    if (isDataLoaded) {
      playAudio(`https://rs-lang-team-be.herokuapp.com/${words[currentWord].audio}`);
      getResponseOptions(words[currentWord])
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      playAudio(`https://rs-lang-team-be.herokuapp.com/${words[currentWord].audio}`);
      getResponseOptions(words[currentWord])
    }
  }, [currentWord]);


  return (
    <div>
      {isDataLoaded ?
      (<>
      <button type="button" onClick={() => {
          playAudio(`https://rs-lang-team-be.herokuapp.com/${words[currentWord].audio}`);
        }}>Say</button>
      <div>
      {responseOptions.map(word => <label htmlFor={word}>
        <input type='radio' value={word} id={word} name="answer"/>
        {word}
        </label>)}
      </div>
      <button  type="button" onClick={() => {
        setResponseOptions([])
          setcurrentWord(currentWord + 1)
          getResponseOptions(words[currentWord])
        } }>Next</button></>)
    :
      (<><h2>Аудиовызов</h2>
      <p>Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.</p>
      <div>
          {LEVELS.map(el => <input type="button"
          value={el + 1}
          onClick={() => {
            getWords(el).then(elem => {
              setWords(elem);
              setIsDataLoaded(true);
              });
              }
              
          }/>)}
        </div></>)
      }
    </div>
  );
}

export default AudioCall;