import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
    text: {
      secondary: '#00000080',
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
      fontSize: 28,
    },
    h4: {
      fontWeight: 600,
      fontSize: 20,
    },
    body2: {
      fontSize: 14,
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            maxWidth: 375,
            height: 42,
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            fontSize: 13,
            fontWeight: 600,
            width: 'fit-content',
            padding: 0,
          },
        },
      ],
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: '#00000017',
          },
        },
      ],
    },
    MuiAlert: {
      styleOverrides: {
        filledInfo: {
          backgroundColor: '#323232',
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default defaultTheme;
