import React from 'react';
import { Box } from '@mui/material';
import Header from '../../Header';

const HomeScreen: React.FC = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Header />
    </Box>
  );
};

export default HomeScreen;
