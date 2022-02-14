import { Grid, Typography, Button, Paper } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import React from 'react';
import DifficultySelector from '../../DifficultySelector';

function Sprint() {
  const [selectedValue, setSelectedValue] = React.useState('1');
  const [gameStarted, setGameState] = React.useState(false);

  const handleDifficultyChange = (value: 'string') => {
    setSelectedValue(value);
  };

  const handleGameStart = () => {
    setGameState(true);
  };

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

            <Grid container component={Paper} elevation={3} flexDirection='column' alignItems='center'>
              <Grid container justifyContent='space-between'>
                <MusicNoteIcon />
              </Grid>
              <Typography fontSize={32}>Word</Typography>
              <Typography fontSize={24}>Перевод</Typography>
              <Grid container justifyContent='space-around'>
                <Button variant="contained" color='error'>Incorrect</Button>
                <Button variant="contained" color='success'>Correct</Button>
              </Grid>
            </Grid>

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