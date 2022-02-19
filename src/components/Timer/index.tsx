import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ITimerProps {
  onGameEnd: Function;
  time: number;
}

const UPDATE_INTERVAL = 1000;
const MAX_PROGRESS = 100;

function Timer (props: ITimerProps) {
  const { onGameEnd, time } = props;
  const [progress, setProgress] = React.useState(0);
  const progressInSec = MAX_PROGRESS / time * UPDATE_INTERVAL;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => oldProgress + progressInSec);
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (progress >= MAX_PROGRESS) onGameEnd();
  }, [progress]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{Math.round(progress * time / MAX_PROGRESS / UPDATE_INTERVAL)}/{time / UPDATE_INTERVAL}</Typography>
      <LinearProgress variant="determinate" value={progress}/>
    </Box>
  )
}

export default Timer;