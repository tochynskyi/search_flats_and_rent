import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '50%',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
  },
  logo: {
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 90,
  },
  formVariant: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    marginTop: 'auto',
    marginBottom: 70,
  },
});

export default useStyles;
