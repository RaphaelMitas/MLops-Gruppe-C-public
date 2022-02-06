import React, {useContext, useEffect} from "react"
import {darkTheme, lightTheme} from "./Theme"
import {darkModeContext} from "./ThemeHandler"
import {ThemeProvider} from '@mui/material/styles'
import {CssBaseline} from '@mui/material'
import MyAppBar from "./Navbar";

const Layout = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(darkModeContext)

  useEffect(() => {
    const theme = localStorage.getItem("preferred-theme")
    if (theme) {
      const themePreference = localStorage.getItem("preferred-theme")
      if (themePreference === "dark") {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    } else {
      localStorage.setItem("preferred-theme", "light")
      setDarkMode(true)
    }
  }, [])

  return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
        <MyAppBar/>
        <main>{children}</main>
      </ThemeProvider>
  )
}

export default Layout
