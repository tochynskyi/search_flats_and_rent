import React, { FC } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import SearchPanel from '../SearchPanel';
import FlatsList from '../FlatList';
import useStyles from './style';
import SelectedFlat from '../SelectedFlat';

const FlatsScreen: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container>
        <Grid item sm={5}>
          <SearchPanel />
          <Typography className={classes.title} variant="h2">
            Flats to rent
          </Typography>
          <FlatsList />
        </Grid>
      </Grid>
      <Grid container className={classes.flatContainer}>
        <Grid item sm={7}>
          <SelectedFlat />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlatsScreen;
