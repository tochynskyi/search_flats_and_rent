import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Container, Typography } from '@mui/material';
import SearchPanel from '../SearchPanel';
import FlatsList from '../FlatsList';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    paddingTop: 60,
  },
  container: {
    display: 'flex',
  },
  title: {
    marginTop: 133,
  },
});
const FlatsScreen: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Container maxWidth="xl">
        <SearchPanel />
        <Typography className={classes.title} variant="h2">
          Flats to rent
        </Typography>
        <FlatsList />
      </Container>
    </Box>
  );
};

export default FlatsScreen;
