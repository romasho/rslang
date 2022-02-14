import React, { useContext } from "react";
import { AudioCallContext } from "../context";
import Question from "./qustion"


function Game() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  console.log('value', quizState);

  return (
    <div>
      {quizState.showResults &&(
        <div>
          End
        </div>
      )}
      {!quizState.showResults && (
        <>
          <div>Audiocall</div>
          <div>Question {quizState.currentQuestionIndex + 1}/{quizState.words.length}</div>
          <Question/>
          <button type="button" onClick={() => dispatch({type: "NEXT_QUESTION"})}>Next Question</button>
        </>
      )}
    </div>
  )
}

export default Game;