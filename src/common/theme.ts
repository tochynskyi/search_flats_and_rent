import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
  },
  typography: {
    h1: {
      textAlign: 'center',
      fontSize: '40px',
      fontWeight: 700,
    },
    h4: {
      color: '#fff',
      fontWeight: 500,
      fontSize: '20px',
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
            maxWidth: '375px',
            height: '42px',
            color: '#fff',
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
