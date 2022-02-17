import { Grid, Typography, Button } from '@mui/material';
import React from 'react';
import DifficultySelector from '../../DifficultySelector';
import GameDialog from '../../GameDialog';
import { getWords } from '../../../utils/services';
import type { IWord } from '../../../interfaces/requestsInterfaces'

function Random(min: number, max: number) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function Sprint() {
  const [selectedValue, setSelectedValue] = React.useState('1');
  const [gameStarted, setGameState] = React.useState(false);
  const [words, setWords] = React.useState<IWord[]>([]);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState<boolean[]>([]);
  const [currentWord, setWord] = React.useState(0);

  const handleDifficultyChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleGameStart = async () => {
    setWords(await getWords(+selectedValue - 1, Random(0, 29)));
    setGameState(true);
  };

  const handleExit = () => {
    setGameState(false);
  };

  const handleAnswer = (answer: boolean) => {
    setWord(currentWord + 1);
    setAnswers(answers.concat(answer));
  };

  React.useEffect( () => {
    if (currentWord === words.length - 1) {
      getWords(+selectedValue - 1, Random(0, 29)).then((newPage) => {
        setWords(words.concat(newPage));
      })
    }
  }, [currentWord]);

  React.useEffect( () => {
    if (answers[answers.length - 1] === true) setScore(score + 10);
  }, [answers]);

  return (
    <Grid container  sx={{
      flexGrow: 1,
      backgroundImage: 'url(forest-red-bg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      mixBlendMode: 'multiply',
    }}>
      {gameStarted?
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} sm={6} md={4}>
            <GameDialog 
              onAnswer={handleAnswer} 
              isCorrect={!false} 
              word={words[currentWord].word} 
              translation={words[currentWord].wordTranslate}
              onExit={handleExit}
            />
          </Grid>
        </Grid>
        :
        <Grid container sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography component='h1' variant='h1' sx={{ mb: 10, fontFamily: 'Permanent Marker' }}>
            Sprint
          </Typography>
          <Typography sx={{ mb: 10, fontSize:32, fontFamily: 'Bebas Neue'}}>
            Check how much points you can score in one minute, <br/> making educated guesses about words
          </Typography>
          <DifficultySelector onChange={handleDifficultyChange} selectedValue={selectedValue} />
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
  );
}

export default Sprint;