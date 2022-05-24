import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: theme.spacing(7.5),
      paddingLeft: 30,
      paddingRight: 30,
    },
    menuIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: 31,
    },
  }),
);

export default useStyles;
