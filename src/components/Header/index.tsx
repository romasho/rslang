import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Container, Menu, MenuItem, Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { loadState } from '../../utils/state';
import { signOut } from '../../utils/services';

const pages = ['SchoolBook', 'Audio call', 'Sprint']
const path = ['/schoolBook', '/audio-call', '/sprint']

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElAuth, setAnchorElAuth] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenAuthMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAuth(event.currentTarget);
  };

  const handleCloseAuthMenu = () => {
    setAnchorElAuth(null);
  };

  const handleSignOut = () => {
    signOut();
    handleCloseAuthMenu();
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
            <Button component={RouterLink} to="/schoolbook" variant='linkBtn' sx={{ fontWeight: 'bold' }}>SchoolBook</Button>
            <Button component={RouterLink} to="/audio-call" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Audio call</Button>
            <Button component={RouterLink} to="/sprint" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Sprint</Button>
          </Box>

          {loadState().auth?
            <>
              <Button 
                color='secondary' 
                startIcon={<PersonIcon />} 
                onClick={handleOpenAuthMenu} 
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                {loadState().auth?.name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorElAuth}
                open={Boolean(anchorElAuth)}
                onClose={handleCloseAuthMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem key={0} onClick={handleCloseAuthMenu}>Statistic</MenuItem>
                <MenuItem key={1} onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </>
          : ''}

          <IconButton component={RouterLink} to="/authorization" sx={{ ml: 1 }}>
            <LoginIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
