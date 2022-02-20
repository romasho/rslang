import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, linearProgressClasses, Typography } from '@mui/material';

interface ITimerProps {
  onGameEnd: Function;
  time: number;
  bColor?: string;
}

const UPDATE_INTERVAL = 1000;
const MAX_PROGRESS = 100;

const StyledLinearProgress = styled(LinearProgress)({
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  }
});

function Timer (props: ITimerProps) {
  const { onGameEnd, time, bColor = 'primary' } = props;
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
    <Box sx={{ width: '100%', mt: 1 }}>
      <Typography sx={{ textAlign: 'center', fontSize: 42, fontFamily: 'Bebas Neue', color: 'gray' }}>{time / UPDATE_INTERVAL - Math.round(progress * time / MAX_PROGRESS / UPDATE_INTERVAL)}</Typography>
      <StyledLinearProgress
        variant="determinate"
        value={progress} sx={{
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: bColor
          }
      }}/>
    </Box>
  )
}

Timer.defaultProps = {
  bColor: 'primary.main'
};

export default Timer;