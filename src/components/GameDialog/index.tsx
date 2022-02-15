import { Grid, Typography, Button, Paper, Stepper, Step, StepLabel } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function GameDialog() {
  return (
    <Grid container component={Paper} elevation={3} flexDirection='column' alignItems='center'>
      <Grid container justifyContent='space-between'>
        <MusicNoteIcon />
        <Stepper>
          <Step>
            <StepLabel>``</StepLabel>
          </Step>
        </Stepper>
        <CloseIcon />
      </Grid>
      <Typography fontSize={32}>Word</Typography>
      <Typography fontSize={24}>Перевод</Typography>
      <Grid container justifyContent='space-around'>
        <Button variant="contained" color='error'>Incorrect</Button>
        <Button variant="contained" color='success'>Correct</Button>
      </Grid>
    </Grid>
  )
}

export default GameDialog;