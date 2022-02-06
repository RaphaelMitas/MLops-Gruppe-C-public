import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  typography: {
  }
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1db954',
    },
    secondary: {
      main: '#1d82b9',
    },
  },
  props: {
    AppBar: {
      color: 'transparent',
    },
  },
})

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      main: "#1db954"
    },
    secondary: {
      main: "#1d82b9"
    }
  }
})

export { darkTheme, lightTheme }
