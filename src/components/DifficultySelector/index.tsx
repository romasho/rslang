import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
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

export default DifficultySelector;