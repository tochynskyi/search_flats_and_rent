import React, { FC, useContext, useEffect, useState } from 'react';
import { DocumentData } from '@firebase/firestore-types';
import { useLocation } from 'react-router-dom';
import { useFirestore } from 'reactfire';
import QueryString from 'qs';
import { Grid } from '@mui/material';
import FlatsListCard from '../FlatListCard';
import { Flat } from '../../../../types';
import { UIContext } from '../../Unknown/UIContext';
import useStyles from './style';

const FlatsList: FC = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const { setAlert } = useContext(UIContext);
  const db = useFirestore();
  const location = useLocation();
  const classes = useStyles();
  const { city } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const flatsFromDB = [] as Flat[];
        if (city) {
          const response = await db
            .collection('flats')
            .where('cityName', '==', city)
            .orderBy('publishedAt')
            .limit(20)
            .get();

          response.forEach((item: DocumentData) => {
            flatsFromDB.push(item.data());
          });
        } else {
          const response = await db
            .collection('flats')
            .orderBy('publishedAt')
            .limit(20)
            .get();
          response.forEach((item: DocumentData) => {
            flatsFromDB.push(item.data());
          });
        }

        setFlats(flatsFromDB);
      } catch (error) {
        if (error instanceof Error) {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
        } else {
          setAlert({
            show: true,
            severity: 'error',
            message: 'Something wrong!',
          });
        }
      }
    })();
  }, [db, setFlats, setAlert, city]);
  return (
    <Grid className={classes.container} container>
      {flats.map((flat) => {
        return <FlatsListCard key={flat.id} flat={flat} />;
      })}
    </Grid>
  );
};

export default FlatsList;
