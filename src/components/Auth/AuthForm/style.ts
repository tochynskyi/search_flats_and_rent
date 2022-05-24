import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: 50,
    },
    title: {
      textAlign: 'center',
      marginBottom: 90,
    },
    button: {
      height: theme.spacing(5.2),
    },
  }),
);
export default useStyles;
