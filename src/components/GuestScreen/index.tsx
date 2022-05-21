import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Container,
  Box,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthBackground from './auth-screen-img.png';
import { ReactComponent as Logo } from './logo.svg';

interface GuestScreenProps {
  children: React.ReactElement;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50%',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
  },
  logo: {
    display: 'flex',
    marginTop: 100,
    marginBottom: 90,
  },
  formVariant: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    paddingBottom: 70,
  },
});

const GuestScreen: React.FC<GuestScreenProps> = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleVariantForm = () => {
    return (
      (pathname === '/login' && history.push('/register')) ||
      (pathname === '/register' && history.push('/login'))
    );
  };

  return (
    <>
      <Box height="100vh" display="flex">
        <Box className={classes.wrapper}>
          <CardMedia
            component="img"
            image={AuthBackground}
            alt="background"
            className={classes.backgroundImage}
          />
        </Box>
        <Box className={classes.wrapper}>
          <Container maxWidth="sm" className={classes.container}>
            <Logo className={classes.logo} />
            {children}
          </Container>
          <Grid className={classes.formVariant}>
            <Typography variant="body2">
              {(pathname === '/login' && "Don't have an account?") ||
                (pathname === '/register' && 'Already have account?')}
            </Typography>
            <Button variant="text" onClick={handleVariantForm}>
              {(pathname === '/login' && 'Register') ||
                (pathname === '/register' && 'Login')}
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default GuestScreen;
