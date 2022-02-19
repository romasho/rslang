import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

// export default function CircularDeterminate({currentWord, countWords}) {
//     const progress = (currentWord / countWords) * 100

//   return (
//     <Stack spacing={6} direction="row">
//       <CircularProgress variant="determinate" value={progress} />
//     </Stack>
//   );
// }



function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, currentWord: number, countWords: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: '100px', height: '100px' }}>
      <CircularProgress variant="determinate" {...props} />
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
        >{`${props.currentWord} / ${props.countWords}`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic({currentWord, countWords}) {
  const progress = (currentWord / countWords) * 100

  return <CircularProgressWithLabel value={progress} currentWord={currentWord} countWords={countWords} size={100}/>;
}