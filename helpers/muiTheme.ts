import { createTheme } from '@mui/material/styles'
import {} from '@mui/material/colors'

// THIS OBJECT SHOULD BE SIMILAR TO ../tailwind.config.js
const themeConstants = {
  paper: '#222222',
  primary: {
    main: '#068888',
    dark: '#046262',
  },
  secondary: { main: '#7AE7C7', dark: '#53DFB5' },
  error: {
    main: '#ff5724',
    dark: '#ff5724',
  },
  fg: { main: '#fff', dark: '#292929' },
  breakpoints: {
    values: { xs: 0, mb: 350, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
}

// Check here for more configurations https://material-ui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    secondary: themeConstants.secondary,
    background: { paper: themeConstants.paper },
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
    error: themeConstants.error,
  },
  breakpoints: themeConstants.breakpoints,
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: ['Manrope', 'sans-serif'].join(','),
  },
})

export default theme
