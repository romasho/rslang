import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import './styles.scss';

function Header() {
  return (

    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <nav className='main-nav'>
          <Button component={RouterLink} to="/" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Home</Button>
          <Button component={RouterLink} to="/about" variant='linkBtn' sx={{ fontWeight: 'bold' }}>About</Button>
          <Button component={RouterLink} to="/dictionary" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Dictionary</Button>
          <Button component={RouterLink} to="/audio-call" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Audio call </Button>
          <Button component={RouterLink} to="/sprint" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Sprint game</Button>
        </nav>
      </Toolbar>
    </AppBar>


  );
}

export default Header;
