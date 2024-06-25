import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/contextProvider';
import axiosClient from '../../axios-client';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import userConsts from '../../consts/common-consts';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useStateContext();

  const userLoggedIn = !!token ? true : false;
  const isAdmin = user && user?.role === userConsts.ADMIN;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  return (
    <AppBar position="fixed" sx={{
      backgroundColor: 'white',
      boxShadow: 0,
      height: 90,
      justifyContent: 'center',
      px: 2
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none',
              fontSize: 28
            }}
          >
            ActivityHUB
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            ActivityHUB
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(isAdmin ? "/adminActivity" : "/activities")}
                sx={{ color: 'black', display: 'block', fontSize: 18, ml: 3 }}
              >
                {page}
              </Button>
            ))}
            {
              isAdmin
                ? <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button
                      key={"Users"}
                      onClick={() => navigate("/users")}
                      sx={{ color: 'black', display: 'block', fontSize: 18, ml: 3 }}
                    >
                      USERS
                    </Button>
                  </Box>
                : null
            }
            {
              userLoggedIn
                ? <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button
                      key={"Logout"}
                      onClick={(e) => onLogout(e)}
                      sx={{ color: 'black', display: 'block', fontSize: 18, ml: 3 }}
                    >
                      Logout
                    </Button>
                    <Button
                      key={"Profile"}
                      onClick={() => navigate("/profile")}
                      sx={{ color: 'black', display: 'block', fontSize: 18, ml: 3 }}
                    >
                      <AccountCircleIcon sx={{ color: 'black' }} fontSize='large' />
                    </Button>
                  </Box>
                : <Button
                    key={"Login"}
                    onClick={() => navigate("/login")}
                    sx={{ color: 'black', display: 'block', fontSize: 18, ml: 3 }}
                  >
                    Login
                  </Button>
            }
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                color: 'black',
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {
                  navigate(isAdmin ? "/adminActivity" : "/activities");
                  handleCloseNavMenu();
                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {userLoggedIn
                ? <MenuItem onClick={(e) => { onLogout(e); handleCloseNavMenu(); }}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                : <MenuItem onClick={() => { navigate("/login"); handleCloseNavMenu(); }}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
