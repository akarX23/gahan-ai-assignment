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
  neutral: '#0A0A05',
  breakpoints: {
    xs: '0px',
    mbmax: { max: '450px' },
    mb: '450px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hoc/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Abril Fatface', 'sans-serif'],
        primary: ['Manrope', 'sans-serif'],
      },
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        secondary: themeConstants.secondary,
        error: themeConstants.error,
        fg: themeConstants.fg.main,
        'fg-dark': themeConstants.fg.dark,
        'fg-paper': themeConstants.fg.paper,
        neutral: themeConstants.neutral,
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      maxWidth: (theme) => ({
        ...theme('spacing'),
      }),
      maxHeight: (theme) => ({
        ...theme('spacing'),
        ...theme('screens'),
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
    },
    screens: {
      ...themeConstants.breakpoints,
      ha: { raw: '(hover: hover)' },
    },
  },
  plugins: [],
  important: true,
}
