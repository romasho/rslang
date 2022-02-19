import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, currentword: number, countwords: number },
) {
  const { value, size, currentword, countwords } = props;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: '100px', height: '100px' }}>
      <CircularProgress variant="determinate" value={value} size={size} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px', height: '100px'
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            fontFamily: 'Permanent Marker',
            fontSize: '1rem'
          }}
        >{`${currentword} / ${countwords}`}</Typography>
      </Box>
    </Box>
  );
}

interface IWordInfo {
  currentword: number,
  countwords: number,
}

export default function CircularStatic({ currentword, countwords }: IWordInfo) {
  const progress = (currentword / countwords) * 100

  return <CircularProgressWithLabel value={progress} currentword={currentword} countwords={countwords} size={100} />;
}