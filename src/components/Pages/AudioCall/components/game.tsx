import { Box, Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { AudioCallContext } from "../context";
import Question from "./qustion"
import TableResult from "../../../ResultsPage/results";
import CircularStatic from "./circularProgress";

interface IGameProps {
  onExit: () => void,
  onRestart: () => void,
}

function Game({ onExit, onRestart }: IGameProps) {
  const [quizState, dispatch] = useContext(AudioCallContext);

  return (
    <Box sx={{
      display: 'flex', alignContent: 'center', flexDirection: 'column',
      alignItems: 'center',
    }}>
      {quizState.showResults && (
        <TableResult words={quizState.words} usersAnswers={quizState.usersAnswers} score={null}  restart={onRestart} choseDifficulty={onExit}/>
      )}
      {!quizState.showResults && (
        <Box sx={{
          display: 'flex',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <IconButton onClick={() => onExit()} sx={{
            position: 'absolute', right: '20px',
            top: '80px'
          }}>
            <CloseIcon />
          </IconButton>
          <CircularStatic currentword={quizState.currentQuestionIndex + 1} countwords={quizState.words.length} />
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