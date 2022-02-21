import { Button, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { ITrainigProps } from '../../../../../interfaces/schoolbookInterfaces';
import { saveSessionState, loadSessionState } from '../../../../../utils/state';

function TrainingBtn({ isDisabled }: ITrainigProps) {
  const [anchorTraining, setAnchorTraining] = React.useState<null | HTMLElement>(null);

  const handleOpenTraining = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTraining(event.currentTarget)
  };

  const handleCloseTraining = () => {
    setAnchorTraining(null)
  };

  const handleTrainingStart = (event: React.MouseEvent<HTMLElement>) => {
    const state = loadSessionState();
    state.game = (event.target as HTMLInputElement).dataset.game;
    saveSessionState(state);
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        variant='outlined'
        onClick={handleOpenTraining}
        sx={{
          fontWeight: 700,
          fontSize: { xs: '10px', sm: '14px' },
          color: 'black',
          borderColor: 'black',
          '&:hover': {
            borderColor: 'black',
            color: '#D9534F'
          }
        }}
      >Training</Button>
      <Menu
        anchorEl={anchorTraining}
        open={Boolean(anchorTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem key={0}
                  onClick={handleTrainingStart}
                  data-game='sprint'
                  component={RouterLink}
                  to='/sprint'
                  sx={{
                    color: 'black', textDecoration: 'none'
                  }}
        >
          Sprint
        </MenuItem>
        <MenuItem key={1}
                  onClick={handleTrainingStart}
                  data-game='audio-call'
                  component={RouterLink}
                  to='/audio-call'
                  sx={{
                    color: 'black', textDecoration: 'none'
                  }}
        >
          Audio call
        </MenuItem>
      </Menu>
    </>
  )
}

export default TrainingBtn;