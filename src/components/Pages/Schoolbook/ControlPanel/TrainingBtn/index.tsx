import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';

function TrainingBtn() {
  const [anchorTraining, setAnchorTraining] = React.useState<null | HTMLElement>(null)

  const handleOpenTraining = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTraining(event.currentTarget)
  }

  const handleCloseTraining = () => {
    setAnchorTraining(null)
  }

  return (
    <>
      <Button variant='outlined' onClick={handleOpenTraining} sx={{ fontWeight: 700, fontSize: { xs: '10px', sm: '14px' } }}>Training</Button>
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