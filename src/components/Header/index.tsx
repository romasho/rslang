import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import './styles.scss';

function Header() {
  return (

    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <nav className='main-nav'>
          <Button component={RouterLink} to="/" variant='linkBtn'>Home</Button>
          <Button component={RouterLink} to="/about" variant='linkBtn'>About</Button>
          <Button component={RouterLink} to="/dictionary" variant='linkBtn'>Dictionary</Button>
          <Button component={RouterLink} to="/audio-call" variant='linkBtn'>Audio call </Button>
          <Button component={RouterLink} to="/sprint" variant='linkBtn'>Sprint game</Button>
        </nav>
      </Toolbar>
    </AppBar>


  );
}

export default Header;
