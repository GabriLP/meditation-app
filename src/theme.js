import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10d48e',
      darker: '#0b9463',
      lighter: '#3fdca4',
    },
    secondary: {
      main: '#132a3a',
      darker: '#0d1d28',
      lighter: '#425461',
    },
    text: {
      primary: '#132a3a', // Dark text color
      secondary: '#fff', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Red Hat Display, sans-serif',
    h1: {
      fontSize: '2.5rem', // Customize heading 1 font size
      fontWeight: 600, // Adjust font weight
      marginBottom: '1rem', // Add spacing
    },
    h2: {
      fontSize: '2rem', // Customize heading 2 font size
      fontWeight: 500, // Adjust font weight
      marginBottom: '0.8rem', // Add spacing
    },
    h3: {
      fontSize: '1.8rem', // Customize heading 3 font size
      fontWeight: 500, // Adjust font weight
      marginBottom: '0.6rem', // Add spacing
    },
    body1: {
      fontSize: '1rem', // Customize body text font size
      lineHeight: 1.4, // Adjust line height for readability
    },
    button: {
      textTransform: 'none', // Prevent uppercase button text
    },
  },
  shape: {
    borderRadius: 8, // Customize border radius for components
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white',
          textTransform: 'none',
        },
        outlined: {
          color: '#0b9463',
        },
      },
    },
  },
});

export default theme;