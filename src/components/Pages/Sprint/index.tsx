import { Grid, Typography, Button } from '@mui/material';
import React from 'react';
import DifficultySelector from '../../DifficultySelector';
import GameDialog from '../../GameDialog';
import { getWords } from '../../../utils/services';
import type { IWord } from '../../../interfaces/requestsInterfaces'
import {
  shuffleArray,
  generateTranslation,
  getWordsFromSchoolbook,
  isTrainingGame,
  deleteTrainingType,
} from '../../../utils/miscellaneous';
import Timer from '../../Timer';
import TableResult from '../../ResultsPage/results';
import { StyledFullScreen, useFullScreenHandle } from '../../StyledFullScreen'

const POINTS_DEFAULT = 10;
const MAX_PAGES = 30;

function Sprint() {
  const [selectedValue, setSelectedValue] = React.useState<number>(1);
  const [gameState, setGameState] = React.useState<false | 'inProgress' | 'ended'>(false);
  const [words, setWords] = React.useState<IWord[]>([]);
  const [score, setScore] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<boolean[]>([]);
  const [currentWord, setWord] = React.useState<number>(0);

  const randomizedPages = shuffleArray(Array.from(Array(MAX_PAGES).keys()));
  const fullScreen = useFullScreenHandle();
  const isTraining = isTrainingGame();

  const handleDifficultyChange = (value: string) => {
    setSelectedValue(+value);
  };

  const handleGameStart = async () => {
    const schoolbookWords = await getWordsFromSchoolbook();
    const newWords =  schoolbookWords || await getWords(+selectedValue - 1, randomizedPages[currentWord]);

    setWords(shuffleArray(newWords));
    setGameState('inProgress');
  };

  const handleExit = () => {
    setGameState(false);
    setScore(0);
    setWord(0);
    setAnswers([]);
    fullScreen.exit();
  };

  const handleRestart = () => {
    handleExit();
    setGameState('inProgress');
  };

  const handleGameEnd = () => {
    setGameState('ended');
    fullScreen.exit();
  };

  const handleAnswer = (answer: boolean) => {
    setWord(currentWord + 1);
    setAnswers(answers.concat(answer));
  };

  React.useEffect(() =>
     () => {
      deleteTrainingType();
    }
  , []);

  React.useEffect( () => {
    if (currentWord === words.length - 10) {
      getWords(+selectedValue - 1, randomizedPages[currentWord]).then((newPage) => {
        const shuffledPage = shuffleArray(newPage);
        setWords(words.concat(shuffledPage));
      })
    }
  }, [currentWord]);

  React.useEffect( () => {
    const combo = answers.length - 1 - answers.lastIndexOf(false);
    const multiplier = Math.ceil(combo / 3);

    setScore(score + POINTS_DEFAULT * multiplier);
  }, [answers]);

  return (
    <StyledFullScreen sx={{ boxShadow: 'inset 0px 2px 4px -1px rgb(0 0 0 / 20%), inset 0px 4px 5px 0px rgb(0 0 0 / 14%), inset 0px 1px 10px 0px rgb(0 0 0 / 12%)' }} handle={fullScreen}>
      <Grid container  justifyContent='center' alignItems='center' flexDirection='column' sx={{
        flexGrow: 1,
        backgroundImage: 'url(forest-red-bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        mixBlendMode: 'multiply'
      }}>
        {gameState === 'inProgress' &&
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Timer onGameEnd={handleGameEnd} time={60000} bColor={answers[answers.length - 1]? 'primary.main' : 'secondary.main'}/>
            <GameDialog
              onAnswer={handleAnswer}
              word={words[currentWord]}
              translation={generateTranslation(words[currentWord], words)}
              onExit={handleExit}
              score={score}
              onFullScreen={fullScreen}
            />
          </Grid>
        </Grid>
        }
        {gameState === 'ended' &&
        <TableResult words={words.slice(0, answers.length)} usersAnswers={answers} score={score} choseDifficulty={handleExit} restart={handleRestart}/>
        }
        {!gameState &&
        <Grid container sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography component='h1' variant='h1' sx={{ mb: 10, fontFamily: 'Permanent Marker' }}>
            Sprint
          </Typography>
          <Typography sx={{ mb: 10, fontSize: 32, fontFamily: 'Bebas Neue'}}>
            Check how much points you can score in one minute, <br/> making educated guesses about words
          </Typography>
          {isTraining? '' : <DifficultySelector onChange={handleDifficultyChange} selectedValue={selectedValue.toString()} />}
          <Button variant='contained'
                  onClick={handleGameStart}
                  sx={{
                    mt: 10,
                    fontSize: 24,
                    fontWeight: 'bold',
                    bgcolor: 'background.default',
                    fontFamily: 'Bebas Neue',
                    letterSpacing: 3
                  }}>
            Start game
          </Button>
        </Grid>
        }
      </Grid>
    </StyledFullScreen>
  );
}

export default Sprint;