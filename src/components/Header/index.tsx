import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Container, Menu, MenuItem, Link, MenuList, Popper, Grow, Paper, ClickAwayListener } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { loadState } from '../../utils/state';
import { signOut } from '../../utils/services';

const pages = ['SchoolBook', 'Audio call', 'Sprint']
const path = ['/schoolBook', '/audiocall', '/sprint']


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

  const [openAuthMenu, setOpenAuthMenu] = React.useState<boolean>(false);
  const anchorAuthRef = React.useRef<HTMLButtonElement>(null);

  const handleToggleAuthMenu = () => {
    setOpenAuthMenu((prevOpen) => !prevOpen);
  };

  const handleCloseAuthMenu = () => {
    setOpenAuthMenu(false);
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
            <Button component={RouterLink} to="/audiocall" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Audio call</Button>
            <Button component={RouterLink} to="/sprint" variant='linkBtn' sx={{ fontWeight: 'bold' }}>Sprint</Button>
          </Box>

          {loadState().auth?
            <>
              <Button
                variant='linkBtn'
                ref={anchorAuthRef}
                id="composition-button"
                startIcon={<PersonIcon color='secondary' />}
                endIcon={<KeyboardArrowDownIcon color='secondary' sx={{ transform: `rotate(${openAuthMenu? '180': '0'}deg)`, transition: '0.5s' }} />}
                onClick={handleToggleAuthMenu}
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                {loadState().auth?.name}
              </Button>
              <Popper
                open={openAuthMenu}
                anchorEl={anchorAuthRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                style={{ zIndex: '999' }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    in={TransitionProps?.in}
                    onEnter={TransitionProps?.onEnter}
                    onExited={TransitionProps?.onExited}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseAuthMenu}>
                        <MenuList
                          autoFocusItem={openAuthMenu}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={handleCloseAuthMenu}>
                            <Button startIcon={<BarChartIcon color='success' />} component={RouterLink} to="/statistic" sx={{ textTransform: 'none', color: 'black' }}>Statistic</Button>
                          </MenuItem>
                          <MenuItem onClick={handleSignOut}>
                            <Button startIcon={<LogoutIcon color='error' />} sx={{ textTransform: 'none', color: 'black' }}>Log out</Button>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
