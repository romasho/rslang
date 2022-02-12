import { Grid, ToggleButtonGroup, ToggleButton, Typography, Button } from '@mui/material';
import React from 'react';

export interface SimpleDialogProps {
  onChange: Function;
  selectedValue: string
}

function DifficultySelector(props: SimpleDialogProps) {
  const { onChange, selectedValue} = props;

  const handleChange = (event: React.MouseEvent<HTMLElement>, difficulty: string) => {
    onChange(difficulty);
  };

  return (
    <>
      <Typography variant='h5' sx={{fontFamily: 'Bebas Neue', color: 'white'}}>
        Select difficulty level
      </Typography>
      <ToggleButtonGroup
        value={selectedValue}
        exclusive
        onChange={handleChange}
        sx={{ fontSize:240, backdropFilter: 'blur(5px)' }}
      >
        <ToggleButton value='1' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          1
        </ToggleButton>
        <ToggleButton value='2' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          2
        </ToggleButton>
        <ToggleButton value='3' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          3
        </ToggleButton>
        <ToggleButton value='4' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          4
        </ToggleButton>
        <ToggleButton value='5' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          5
        </ToggleButton>
        <ToggleButton value='6' sx={{ width: 50, height: 50, fontSize: 24, color: 'white' }}>
          6
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

function Sprint() {
  const [selectedValue, setSelectedValue] = React.useState('1');

  const handleDifficultyChange = (value: string) => {
    setSelectedValue(value);
    console.log(value);
  };

  return (
    <Grid container justifyContent='center' sx={{
      flexGrow: 1,
      backgroundImage: 'url(forest-red-bg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      mixBlendMode: 'multiply',
    }}>
      <Grid item sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
      }}>
        <Typography component='h1' variant='h1' sx={{ mb: 10, fontFamily: 'Permanent Marker' }}>
          Sprint
        </Typography>
        <Typography sx={{ mb: 10, fontSize:32, fontFamily: 'Bebas Neue'}}>
          Check how much points you can score in one minute, <br/> making educated guesses about words
        </Typography>
        <DifficultySelector onChange={handleDifficultyChange} selectedValue={selectedValue} />
        <Button variant='contained' sx={{ mt: 10, fontSize: 24, fontWeight: 'bold', bgcolor: 'background.default', fontFamily: 'Bebas Neue', letterSpacing: 3  }}>
          Start game
        </Button>
      </Grid>
    </Grid>
  );
}

export default Sprint;