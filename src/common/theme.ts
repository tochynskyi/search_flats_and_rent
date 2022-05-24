import { createTheme } from '@mui/material';

const colors = {
  primary: '#F50057',
  white: '#FFF',
  backgroundInput: '#00000017',
  snackbarInfoBackground: '#323232',
  textPrimary: '#000000DE',
  textSecondary: '#00000080',
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
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
          props: { variant: 'text', color: 'primary' },
          style: {
            fontSize: 13,
            fontWeight: 600,
          },
        },
      ],
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: colors.backgroundInput,
          },
        },
      ],
    },
    MuiAlert: {
      styleOverrides: {
        filledInfo: {
          backgroundColor: colors.snackbarInfoBackground,
          color: colors.white,
        },
      },
    },
  },
});

export default defaultTheme;
