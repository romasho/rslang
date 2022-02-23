import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import HelpIcon from '@mui/icons-material/Help';
import { AudioCallContext } from "../context";
import Question from "./qustion"
import TableResult from "../../../ResultsPage/results";
import CircularStatic from "./circularProgress";

interface IGameProps {
  onExit: () => void,
  onRestart: () => void,
  onFullScreen: {
    active: boolean;
    enter: () => Promise<void>;
    exit: () => Promise<void>;
    node: React.MutableRefObject<HTMLDivElement | null>;
  }
}

function Game({ onExit, onRestart, onFullScreen }: IGameProps) {
  const [quizState, dispatch] = useContext(AudioCallContext);

  const handleFullScreen = () => {
    if (onFullScreen.active) onFullScreen.exit();
    else onFullScreen.enter();
  };

  if (quizState.showResults) onFullScreen.exit();

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && quizState.currentAnswer) {
      dispatch({ type: "NEXT_QUESTION" })

    }
  }

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [quizState.currentAnswer]);

  return (
    <Box sx={{
      display: 'flex', alignContent: 'center', flexDirection: 'column',
      alignItems: 'center', width: '90%', margin: '0 auto'
    }}>
      {quizState.showResults && (
        <TableResult words={quizState.words} usersAnswers={quizState.usersAnswers} score={null} restart={onRestart} choseDifficulty={onExit} />
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
          <IconButton onClick={handleFullScreen} sx={{
            position: 'absolute', right: '60px',
            top: '80px'
          }}>
            {onFullScreen.active ?
              <FullscreenExitIcon />
              :
              <FullscreenIcon />
            }
          </IconButton>
          <Tooltip title='You can use "1", "2", "3", "4" to choose answers and "Enter" to next question'
          sx={{
            position: 'absolute', right: '100px',
            top: '80px'
          }}>
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          <CircularStatic currentword={quizState.currentQuestionIndex + 1} countwords={quizState.words.length} />
          <Question />
          <Button variant="contained"
            type="button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            disabled={!quizState.currentAnswer}
            sx={{

              fontWeight: 'bold',
              bgcolor: 'background.default',
              fontFamily: 'Bebas Neue',
            }}>
            Next Question
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Game;