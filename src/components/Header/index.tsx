import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, ButtonGroup } from '@mui/material';

function Header() {
  return (

    <AppBar position='static'>
      <Toolbar>
        <ButtonGroup
          component="nav"
          sx={{ gap: 2 }}
        >
          <Button component={RouterLink} to="/" variant='linkBtn'>Home</Button>
          <Button component={RouterLink} to="/about" variant='linkBtn'>About</Button>
          <Button component={RouterLink} to="/dictionary" variant='linkBtn'>Dictionary</Button>
        </ButtonGroup>
        {/* <nav>

        </nav> */}
      </Toolbar>
    </AppBar>


  );
}

export default Header;
