import React from 'react';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './style';
import AuthBackground from './auth-screen-img.png';
import { ReactComponent as Logo } from './logo.svg';

interface GuestLayoutProps {
  children: React.ReactElement;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
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
        <Grid container className={classes.formContainer}>
          <Grid item sm={7}>
            <Box className={classes.logo}>
              <Logo />
            </Box>
            {children}
          </Grid>
        </Grid>

        <Box className={classes.formVariant}>
          <Typography variant="body2">
            {(pathname === '/login' && "Don't have an account?") ||
              (pathname === '/register' && 'Already have account?')}
          </Typography>
          <Button variant="text" onClick={handleVariantForm}>
            {(pathname === '/login' && 'Register') ||
              (pathname === '/register' && 'Login')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GuestLayout;
