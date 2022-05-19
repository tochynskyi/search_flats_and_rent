import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import AuthBackground from '../../../assets/auth-screen-img.png';
import Logo from '../../../assets/logo.svg';

import AuthForm from '../Form';

const SignInScreen: React.FC = () => {
  return (
    <>
      <Box height="100vh" display="flex">
        <Box sx={{ height: '100%', width: '50%', minWidth: '50%' }}>
          <CardMedia
            component="img"
            image={AuthBackground}
            alt="background"
            sx={{ height: '100%', width: '100%', objectFit: 'fill' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            minWidth: '50%',
            marginTop: '100px',
          }}
        >
          <Container
            fixed
            maxWidth="xs"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '37px',
                width: '173px',
                marginBottom: '90px',
              }}
            >
              <CardMedia
                component="img"
                image={Logo}
                alt="background"
                sx={{ height: '100%', width: '100%' }}
              />
            </Grid>
            <AuthForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SignInScreen;
