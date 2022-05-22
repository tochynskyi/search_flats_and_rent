import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, Button } from '@mui/material';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    paddingTop: 60,
  },
  navBtn: {
    width: 142,
    height: 36,
    fontSize: 13,
    marginTop: 40,
  },
});
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
