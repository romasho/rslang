import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { AudioCallContext } from "../context";
import Question from "./qustion"
import TableResult from "./results";


function Game() {
  const [quizState, dispatch] = useContext(AudioCallContext);
  console.log('value', quizState);

  return (
    <Box sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column',
    alignItems: 'center', height: '100%' }}>
      {quizState.showResults &&(
        <TableResult/>
      )}
      {!quizState.showResults && (
        <Box sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column',
        alignItems: 'center' }}>
          <div>Audiocall</div>
          <div>Question {quizState.currentQuestionIndex + 1}/{quizState.words.length}</div>
          <Question/>
          <Button variant="outlined" type="button" onClick={() => dispatch({type: "NEXT_QUESTION"})} disabled={!quizState.currentAnswer}>Next Question</Button>
        </Box>
      )}
    </Box>
  )
}

export default Game;