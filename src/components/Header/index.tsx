import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Container, Menu, MenuItem, Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';

const pages = ['Dictionary', 'Audio call', 'Sprint']
const path = ['/dictionary', '/audio-call', '/sprint']

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (

    <AppBar position='static' >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link component={RouterLink} to={path[i]} sx={{ color: 'black', textDecoration: 'none' }}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <IconButton area-label="" component={RouterLink} to="/" sx={{ color: 'black' }} >
            <MenuBookIcon />
          </IconButton>



          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button component={RouterLink} to="/dictionary" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Dictionary</Button>
            <Button component={RouterLink} to="/audio-call" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Audio call</Button>
            <Button component={RouterLink} to="/sprint" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Sprint</Button>
          </Box>
          <IconButton component={RouterLink} to="/authorization" sx={{ ml: 1 }}>
            <LoginIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>


  );
}

export default Header;
