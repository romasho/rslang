import { Grid, Typography, Button, Paper, IconButton, Tooltip } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import HelpIcon from '@mui/icons-material/Help';
import React from 'react';

interface GameDialogProps {
  onClick: Function;
  isCorrect: boolean;
  word: string;
  translation: string;
}

function GameDialog(props: GameDialogProps) {
  const { onClick, isCorrect, word, translation } = props;
  const [answerStatus, setAnswerStatus] = React.useState<boolean | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { answer } = (event.target as HTMLElement).dataset;
    if (answer === isCorrect.toString()) setAnswerStatus(true);
    else setAnswerStatus(false);
    onClick(`${answer} ${answerStatus}`);
  };

  React.useEffect(() => {
    setTimeout(() => setAnswerStatus(null), 1000);
    // setAnswerStatus(null);
    console.log('lolol')
  }, [word]);

  return (
    <Grid container component={Paper} elevation={3} flexDirection='column' alignItems='center' sx={{
      p: 2,
      outline: (() => {
        if (answerStatus === null) return 'none';
        if (answerStatus)return '2px solid green';
        return '2px solid red';
      })(),
    }}>

      <Grid container justifyContent='space-between' flexWrap='nowrap' sx={{ mb: 2 }}>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <Tooltip title='You can use arrow keys to choose answers'>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <Grid container alignItems='center' justifyContent='center'>
          <CircleIcon color="disabled" />
          <CircleIcon color="disabled" />
          <CircleIcon color="disabled" />
        </Grid>
        <IconButton>
          <FullscreenIcon />
        </IconButton>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Typography fontSize={32}>{word}</Typography>
      <IconButton>
        <MusicNoteIcon />
      </IconButton>
      <Typography fontSize={24}>{translation}</Typography>
      <Grid container justifyContent='space-around' sx={{ mt: 2 }}>
        <Button variant="contained" color='error' data-answer='false' onClick={handleClick}>Incorrect</Button>
        <Button variant="contained" color='success' data-answer='true' onClick={handleClick}>Correct</Button>
      </Grid>
    </Grid>
  )
}

export default GameDialog;