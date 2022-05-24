import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';
import { DocumentData } from '@firebase/firestore-types';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useStyles from './style';
import { Flat } from '../../../../types';
import { UIContext } from '../../Unknown/UIContext';
import Map from '../GoogleMap';

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const SelectedFlat: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<Flat | null>(null);
  const { setAlert } = useContext(UIContext);
  const location = useLocation();
  const classes = useStyles();
  const db = useFirestore();

  const flatId = location.pathname.split('/flats').join('').slice(1, -1);

  const marker = useEffect(() => {
    const getFlat = async () => {
      try {
        const response = await db
          .collection('flats')
          .where('id', '==', flatId)
          .get();
        response.forEach((querySnapshot: DocumentData) => {
          setDetails(querySnapshot.data());
        });

        setLoading(false);
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
      setLoading(false);
    };
    if (flatId) {
      getFlat();
    }
  }, [flatId, db, setAlert]);

  if (!flatId) {
    return (
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4" color="theme.palette.common.white">
            No flat selected
          </Typography>
        </Grid>
      </Grid>
    );
  }
  if (!details) {
    return (
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4" color="theme.palette.common.white">
            Failed to load the flat
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        {loading ? (
          <Typography variant="h4" className={classes.title}>
            Loading flat details
          </Typography>
        ) : (
          <Map
            id="myMap"
            options={{
              center: { lat: details.latitude, lng: details.longitude },
              zoom: 15,
            }}
            onMapLoad={(map: ReactNode) => {
              return new window.google.maps.Marker({
                position: { lat: details.latitude, lng: details.longitude },
                map,
              });
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default SelectedFlat;
