import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BookIcon from '@mui/icons-material/Book';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {Button, IconButton, Slide, styled, useScrollTrigger} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {darkModeContext} from "./ThemeHandler";
import {Link} from "gatsby";
import {useAuth} from "../../contexts/AuthContext";
import GoogleIcon from '@mui/icons-material/Google';


function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MyAppBar(props) {
  const DarkModeContext = useContext(darkModeContext)
  const { darkMode, setDarkMode } = DarkModeContext;
  const {currentUser, logout, signIn} = useAuth();

  const handleThemeChange = () => {
    if (darkMode) {
      localStorage.setItem("preferred-theme", "light")
      setDarkMode(false)
    } else {
      localStorage.setItem("preferred-theme", "dark")
      setDarkMode(true)
    }
  }

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll {...props}>
        <AppBar color="background" position="fixed">
          <Toolbar>

            <Button
                sx={{ display: { xs: 'flex', sm: 'flex' } }}
                startIcon={<EventSeatIcon/>}
                component={Link} to="/"
            >
              <b>Concerts</b>
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <Button
                sx={{  display: { xs: 'flex', sm: 'flex' } }}
                color="inherit"
                startIcon={<BookIcon/>}
                component={Link} to="/blog"
            >
              <b>Blog</b>
            </Button>

            {currentUser ?
              <Button
                  sx={{  display: { xs: 'flex', sm: 'flex' } }}
                  color="inherit"
                  startIcon={<GoogleIcon/>}
                  onClick={logout}
              >
                <b>logout</b>
              </Button> :
                <Button
                  sx={{  display: { xs: 'flex', sm: 'flex' } }}
                  color="inherit"
                  startIcon={<GoogleIcon/>}
                  onClick={signIn}
              >
                <b>Sign In</b>
              </Button>

            }

            <IconButton color="inherit" onClick={handleThemeChange}>
              { darkMode ? <LightModeIcon/> : <DarkModeIcon/> }

            </IconButton>

          </Toolbar>
        </AppBar>
        </HideOnScroll>
        <Offset/>
      </Box>
  );
}
