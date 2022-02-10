import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import LinkRss from './LinkRss';

const links = ['https://github.com/olesiklesha', 'https://github.com/romasho', 'https://github.com/artyomkr']
const creators = ['olesiklesha', 'romasho', 'artyomkr']

function Footer() {
  return (
    <Box className='footer'>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          order: { xs: 2, sm: 1 }
        }}>
        <LinkRss />
        <Typography variant='body2' sx={{ flexGrow: 1, textAlign: 'right', lineHeight: '37px' }}>Created by:</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
          {creators.map((creator, i) => (
            <Button key={creator} href={links[i]} target='_blank' variant='linkBtn' sx={{ color: 'black', textTransform: 'none' }}>{creator}</Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

// order: { xs: -1, sm: 2 }