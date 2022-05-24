import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'fixed',
      width: theme.spacing(72),
      zIndex: 1000,
      marginTop: 28,
      backgroundColor: theme.palette.common.white,
    },
    searchIcon: {
      position: 'absolute',
      right: 25,
      cursor: 'pointer',
    },
  }),
);

export default useStyles;
