import { Box, Button } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box className='footer'>
      <Button>asg</Button>
      <Box sx={{ flexGrow: 1 }} />
      <div className="creaters">
        Created by:
        <Button href='https://github.com/olesiklesha' target='_blank' variant='linkBtn'>olesiklesha</Button>
        <Button href='https://github.com/romasho' target='_blank' variant='linkBtn'>romasho</Button>
        <Button href='https://github.com/artyomkr' target='_blank' variant='linkBtn'>artyomkr</Button>
      </div>
    </Box>
  );
}

export default Footer;
