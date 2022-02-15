import { Grid, Typography, Button, Paper, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import React from 'react';

function GameDialog() {
  return (
    <Grid container component={Paper} elevation={3} flexDirection='column' alignItems='center' sx={{ p: 2 }}>

      <Grid container justifyContent='space-between' flexWrap='nowrap' sx={{ mb: 2 }}>
        <IconButton sx={{ mr: '40px' }}>
          <NotificationsActiveIcon />
        </IconButton>
        <Grid container alignItems='center' justifyContent='center'>
          <CircleIcon color="disabled" />
          <CircleIcon color="disabled" />
          <CircleIcon color="disabled" />
        </Grid>
        <IconButton>
          <FullscreenIcon />
        </IconButton>
        <IconButton >
          <CloseIcon />
        </IconButton>
      </Grid>



      <Typography fontSize={32}>Word</Typography>
      <IconButton>
        <MusicNoteIcon />
      </IconButton>
      <Typography fontSize={24}>Перевод</Typography>
      <Grid container justifyContent='space-around' sx={{ mt: 2 }}>
        <Button variant="contained" color='error'>Incorrect</Button>
        <Button variant="contained" color='success'>Correct</Button>
      </Grid>
    </Grid>
  )
}

export default GameDialog;