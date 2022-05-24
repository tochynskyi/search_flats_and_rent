import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import useStyles from './style';

const HomeScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleRedirect = () => {
    history.push('/flats');
  };
  return (
    <Box className={classes.wrapper}>
      <Button
        onClick={handleRedirect}
        className={classes.navBtn}
        variant="contained"
      >
        EXPLORE FLATS
      </Button>
    </Box>
  );
};

export default HomeScreen;
