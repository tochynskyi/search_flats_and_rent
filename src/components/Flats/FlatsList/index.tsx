import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFirestore } from 'reactfire';
import QueryString from 'qs';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import FlatsListCard from '../FlatsListCard';
import { Flat } from '../../../../types';

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    rowGap: 50,
  },
});
const FlatsList: FC = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const db = useFirestore();
  const history = useHistory();
  const classes = useStyles();

  const filterByCity = flats.filter((flat) => {
    const { city } = QueryString.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

    return city ? flat.cityName === city : flat.cityName;
  });

  useEffect(() => {
    const flatsDB = async (): Promise<Flat[]> => {
      const flatsFromDB: any[] = [];

      const response = await db.collection('flats').get();

      response.forEach((flat) => flatsFromDB.push(flat.data()));

      const filterByDate = flatsFromDB.sort((a: Flat, b: Flat) => {
        const dateA: number = +new Date(a.publishedAt.seconds);
        const dateB: number = +new Date(b.publishedAt.seconds);
        return dateB - dateA;
      });
      return filterByDate;
    };
    flatsDB().then((data) => setFlats(data));
  }, [db, setFlats]);
  return (
    <Grid className={classes.container} container>
      {flats &&
        filterByCity.map((flat) => {
          return <FlatsListCard key={flat.id} flat={flat} />;
        })}
    </Grid>
  );
};

export default FlatsList;
