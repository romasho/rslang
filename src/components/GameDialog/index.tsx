import React from 'react';
import { Grid, Typography, Button, Paper, IconButton, Tooltip } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import HelpIcon from '@mui/icons-material/Help';
import type { IWord } from '../../interfaces/requestsInterfaces';
import { playAudio } from  '../../utils/miscellaneous';

interface IGameDialogProps {
  onAnswer: Function;
  word: IWord;
  translation: string;
  onExit: Function;
  score: number;
  onFullScreen:  {
    active: boolean;
    enter: () => Promise<void>;
    exit: () => Promise<void>;
    node: React.MutableRefObject<HTMLDivElement | null>;
  }
}

function GameDialog(props: IGameDialogProps) {
  const { onAnswer, word, translation, onExit, score, onFullScreen } = props;
  const [answerStatus, setAnswerStatus] = React.useState<boolean | null>(null);
  const [indicators, setIndicators] = React.useState<('disabled' | 'secondary')[]>(Array(3).fill('disabled'));
  const [volume, setVolume] = React.useState<boolean>(true);
  const isCorrect = word.wordTranslate === translation;

  const handleAnswer = (answer: boolean) => {
    const answerIsCorrect = (answer === isCorrect);

    if (answerIsCorrect) playAudio('success.mp3', volume? 0.1 : 0);
    else playAudio('error.mp3', volume? 0.1 : 0);

    setAnswerStatus(answerIsCorrect);
    onAnswer(answerIsCorrect);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const answer  = ((event.target as HTMLElement).dataset.answer === 'true');
    handleAnswer(answer);
  };

  const handleClickAudio = () => {
    playAudio(`https://rs-lang-team-be.herokuapp.com/${word.audio}`);
  };

  const handleClickVolume = () => {
    if (volume) setVolume(false);
    else setVolume(true);
  };

  const handleFullScreen = () => {
    if (onFullScreen.active) onFullScreen.exit();
    else onFullScreen.enter();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    let answer = null;
    if (event.key === 'ArrowRight') answer = true;
    if (event.key === 'ArrowLeft') answer = false;
    if (answer !== null) handleAnswer(answer);
  };

  const updateIndicators = (result: boolean) => {
    const indicatorsClone = indicators.slice();

    if (!result) indicatorsClone.fill('disabled');
    else if (result && indicatorsClone.includes('disabled')) {
      indicatorsClone[indicatorsClone.indexOf('disabled')] = 'secondary';
    } else {
      indicatorsClone.fill('disabled');
      indicatorsClone[0] = 'secondary';
    }
    
    setIndicators(indicatorsClone);
  };

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [translation]);

  React.useEffect(() => {
    updateIndicators(!!answerStatus);
    const timer = setTimeout(() => setAnswerStatus(null), 800);
    return () => {
      clearTimeout(timer);
    }
  }, [word]);

  return (
    <Grid
      container
      component={Paper}
      flexDirection='column'
      alignItems='center'
      sx={{
        p: 2,
        boxShadow: (() => {
          if (answerStatus === null) return 'none';
          if (answerStatus) return '0 0 0 5px #96CEB4';
          return '0 0 0 5px #D9534F';
      })(),
      transition: '300ms'
    }}>

      <Grid container justifyContent='space-between' flexWrap='nowrap' sx={{ mb: 1 }}>
        <IconButton onClick={handleClickVolume}>
          {volume?
            <NotificationsActiveIcon />
            :
            <NotificationsOffIcon />
          }
        </IconButton>
        <Tooltip title='You can use arrow keys to choose answers'>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <Grid container alignItems='center' justifyContent='center'>
          <CircleIcon color={indicators[0]} />
          <CircleIcon color={indicators[1]} />
          <CircleIcon color={indicators[2]} />
        </Grid>
        <IconButton onClick={handleFullScreen}>
          {onFullScreen.active?
            <FullscreenExitIcon/>
            :
            <FullscreenIcon />
          }
        </IconButton>
        <IconButton onClick={() => onExit()}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Typography sx={{ color: 'secondary.main', fontWeight: 'bold', fontSize: 20 }}>
        {score}
      </Typography>

      <Typography fontSize={32}>{word.word}</Typography>
      <IconButton color='secondary' onClick={handleClickAudio}>
        <MusicNoteIcon />
      </IconButton>
      <Typography fontSize={24}>{translation}</Typography>
      <Grid container justifyContent='space-around' sx={{ mt: 2 }}>
        <Button variant="contained" color='error' data-answer='false' onClick={handleClick} >◄ Incorrect</Button>
        <Button variant="contained" color='success' data-answer='true' onClick={handleClick}>Correct ►</Button>
      </Grid>
    </Grid>
  )
}

export default GameDialog;