import React, { FC, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { Flat } from '../../../../types';
import useStyles from './style';

interface FlatsListCardProps {
  flat: Flat;
}

const FlatsListCard: FC<FlatsListCardProps> = ({ flat }) => {
  const classes = useStyles();
  const flatView = useMemo(() => flat, [flat]);
  const history = useHistory();
  const location = useLocation();
  const [selectFlat, setSelectFlat] = useState<boolean>(false);
  const flatId = location.pathname.split('/flats').join('').slice(1, -1);

  const handleSelectFlat = (): void => {
    if (!flat.id) {
      history.push(`/flats${location.search}`);
    }
    history.push(`/flats/${flat.id}/${location.search}`);
    setSelectFlat(true);
  };

  useEffect(() => {
    if (flat.id !== flatId) {
      setSelectFlat(false);
    }
  }, [flatId, flat]);
  useEffect(() => {}, [setSelectFlat, flat, flatId]);
  return (
    <Card
      className={
        selectFlat ? `${classes.selectedWrapper}` : `${classes.wrapper}`
      }
    >
      <CardMedia
        className={classes.image}
        component="img"
        src={flatView.photoUrl}
        alt="Flat"
      />
      <CardContent className={classes.content}>
        <Typography variant="h4">${flat.dailyPriceUsd} / night</Typography>
        <Typography className={classes.address} variant="body2">
          {flatView.address}
        </Typography>
        <Typography className={classes.description} variant="body2">
          {flatView.description}
        </Typography>
        <Button
          onClick={handleSelectFlat}
          className={classes.button}
          size="small"
        >
          DETAILS
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlatsListCard;
