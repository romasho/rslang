import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LoginIcon from '@mui/icons-material/Login';
import './styles.scss';

function Header() {
  return (

    <AppBar position='static'>
      <Toolbar>
        <IconButton area-label="" component={RouterLink} to="/" color="secondary" >
          <MenuBookIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <nav className='main-nav' >
          <Button component={RouterLink} to="/dictionary" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Dictionary</Button>
          <Button component={RouterLink} to="/audio-call" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Audio call </Button>
          <Button component={RouterLink} to="/sprint" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Sprint game</Button>
          <IconButton component={RouterLink} to="/authorization">
            <LoginIcon color="secondary" />
          </IconButton>
        </nav>
      </Toolbar>
    </AppBar>


  );
}

export default Header;
