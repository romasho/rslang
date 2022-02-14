import { Grid, Typography, Button } from '@mui/material';
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
  }

  return (
    <Grid container justifyContent='center' sx={{
      flexGrow: 1,
      backgroundImage: 'url(forest-red-bg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      mixBlendMode: 'multiply',
    }}>
      {gameStarted?
        <Typography>Game</Typography> 
        : 
        <Grid item sx={{
          display: 'flex',
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