import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export interface SimpleDialogProps {
  onChange: Function;
  selectedValue: string
}

const StylesToggleButton = styled(ToggleButton)({
  width: 50,
  height: 50,
  fontSize: 24,
  color: 'white',
  '&.Mui-selected': {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
});

function DifficultySelector(props: SimpleDialogProps) {
  const { onChange, selectedValue} = props;

  const handleChange = (event: React.MouseEvent<HTMLElement>, difficulty: string) => {
    if (difficulty !== null) {
      onChange(difficulty);
    }
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
        <StylesToggleButton value='1'>
          1
        </StylesToggleButton>
        <StylesToggleButton value='2'>
          2
        </StylesToggleButton>
        <StylesToggleButton value='3'>
          3
        </StylesToggleButton>
        <StylesToggleButton value='4'>
          4
        </StylesToggleButton>
        <StylesToggleButton value='5'>
          5
        </StylesToggleButton>
        <StylesToggleButton value='6'>
          6
        </StylesToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default DifficultySelector;