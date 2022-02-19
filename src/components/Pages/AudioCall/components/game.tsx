import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { AudioCallContext } from "../context";
import Question from "./qustion"
import TableResult from "../../../ResultsPage/results";
import CircularStatic from "./circularProgress";


function Game() {
  const [quizState, dispatch] = useContext(AudioCallContext);

  return (
    <Box sx={{
      display: 'flex', alignContent: 'center', flexDirection: 'column',
      alignItems: 'center', 
    }}>
      {quizState.showResults && (
        <TableResult words={quizState.words} usersAnswers={quizState.usersAnswers}  score={null} />
      )}
      {!quizState.showResults && (
        <Box sx={{
          display: 'flex', 
          alignContent: 'center', 
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <CircularStatic currentWord={quizState.currentQuestionIndex + 1} countWords={quizState.words.length}/>
          <Question />
          <Button variant="outlined"
            type="button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            disabled={!quizState.currentAnswer}>
            Next Question
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Game;