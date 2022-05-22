import React, { useContext, useState } from 'react';
import { useAuth } from 'reactfire';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import validationSchema from './validationSchema';

const useStyles = makeStyles({
  container: {
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
  input: {
    width: 375,
    height: 55,
  },
});

const AuthForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = React.useCallback(
    async (
      email: string,
      password: string,
      setSubmitting: (isSubmitting: boolean) => void,
    ) => {
      try {
        setSubmitting(true);
        await auth.signInWithEmailAndPassword(email, password);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAlert({
            show: true,
            severity: 'error',
            message: err.message,
          });
          setSubmitting(false);
        }
      }
    },
    [auth, setAlert],
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" className={classes.title}>
        Login
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }, { setSubmitting }) => {
          handleSignIn(email, password, setSubmitting);
        }}
      >
        {(formik) => (
          <Form className={classes.container}>
            <TextField
              className={classes.input}
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.input}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              LOGIN
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AuthForm;
