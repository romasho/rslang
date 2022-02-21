import { IWord } from '../interfaces/requestsInterfaces';
import { loadSessionState, saveSessionState } from './state';
import { getWords } from './services';

const audioPlayer = new Audio();

function playAudio(url: string, volume: number = 0.1) {
  audioPlayer.volume = volume;
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}

function shuffleArray<Type>(origArray: Array<Type>) {
  const array = origArray.slice();
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function random(min: number, max: number) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function generateTranslation(word: IWord, wordsArr: IWord[]) {
  const incorrect = wordsArr[random(0, wordsArr.length - 1)].wordTranslate;
  const correct = word.wordTranslate;

  if (random(0, 1)) return incorrect;
  return correct;
}

function isTrainingGame() {
  const gameName = window.location.href.split('/')[window.location.href.split('/').length - 1];
  const sessionState = loadSessionState();

  return gameName === sessionState.game;
}

async function getWordsFromSchoolbook () {
  const sessionState = loadSessionState();

  if (isTrainingGame()) {
    delete sessionState.game;
    saveSessionState(sessionState);

    return getWords(sessionState.chapter, sessionState.page);
  }
  return null;
}

export { playAudio, random, shuffleArray, generateTranslation, isTrainingGame, getWordsFromSchoolbook }