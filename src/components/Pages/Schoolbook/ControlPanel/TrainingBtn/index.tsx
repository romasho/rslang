import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { ITrainigProps } from '../../../../../interfaces/schoolbookInterfaces';

function TrainingBtn({ isDisabled }: ITrainigProps) {
  const [anchorTraining, setAnchorTraining] = React.useState<null | HTMLElement>(null)

  const handleOpenTraining = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTraining(event.currentTarget)
  }

  const handleCloseTraining = () => {
    setAnchorTraining(null)
  }

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
        <MenuItem>Sprint</MenuItem>
        <MenuItem>Audio call</MenuItem>
      </Menu>
    </>
  )
}

export default TrainingBtn;