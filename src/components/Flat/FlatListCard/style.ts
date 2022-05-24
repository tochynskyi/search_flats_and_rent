import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      width: '100%',
      maxWidth: theme.spacing(72),
      height: theme.spacing(30),
      boxShadow: theme.shadows[1],
    },
    selectedWrapper: {
      display: 'flex',
      width: '100%',
      maxWidth: theme.spacing(72),
      height: theme.spacing(30),
      boxShadow: theme.shadows[3],
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
    description: {
      fontSize: 8,
      height: theme.spacing(4.5),
      wordWrap: 'break-word',
      overflow: 'hidden',
      color: theme.palette.text.secondary,
    },
    button: {
      marginTop: 'auto',
      alignSelf: 'flex-start',
    },
  }),
);

export default useStyles;
