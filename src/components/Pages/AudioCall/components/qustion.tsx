import React, {useContext} from 'react';
import { playAudio } from '..';
import { AudioCallContext } from '../context';
import Answer from './answer'

function Question() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  const currentWord = quizState.words[quizState.currentQuestionIndex];
  return (
    <div>
      <button type="button" onClick={() => {playAudio(`https://rs-lang-team-be.herokuapp.com/${currentWord.audio}`)}}>Repeat word</button>
      <div>
        {quizState.answers.map((answer) => (
          <Answer key={answer} answerText={answer}/>
        ))}
      </div>
    </div>
  );
}

export default Question;