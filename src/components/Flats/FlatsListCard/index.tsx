import React, { FC } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Theme,
} from '@mui/material';
import { Flat } from '../../../../types';

interface FlatsListCardProps {
  flat: Flat;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      width: '100%',
      maxWidth: 580,
      height: 240,
    },
    image: {
      width: '50%',
      objectFit: 'cover',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
    },
    address: {
      color: theme.palette.text.secondary,
      marginBottom: 10,
      marginTop: 15,
    },
    discription: {
      fontSize: 8,
      maxHeight: 50,
      overflow: 'hidden',
      color: theme.palette.text.secondary,
    },
    button: {
      marginTop: 'auto',
    },
  }),
);

const FlatsListCard: FC<FlatsListCardProps> = ({ flat }) => {
  const classes = useStyles();
  return (
    <Card className={classes.wrapper}>
      <CardMedia
        className={classes.image}
        component="img"
        //   image={FlatImg}
        src={
          flat.photoUrl
            ? flat.photoUrl
            : 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
        }
        alt="Flat"
      />
      <CardContent className={classes.content}>
        <Typography variant="h4">${flat.dailyPriceUsd} / night</Typography>
        <Typography className={classes.address} variant="body2">
          {flat.address}
        </Typography>
        <Typography className={classes.discription} variant="body2">
          {flat.description}
        </Typography>
        <Button className={classes.button} size="small">
          DETAILS
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlatsListCard;
