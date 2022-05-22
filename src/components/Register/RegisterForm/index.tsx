import React, { useContext, useState } from 'react';
import { useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';
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
    display: 'grid',
    justifyContent: 'center',
    rowGap: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 80,
  },
  input: {
    width: 375,
    height: 55,
  },
});

const Auth: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSignUp = React.useCallback(
    async (
      email: string,
      fullName: string,
      password: string,
      setSubmitting: (isSubmitting: boolean) => void,
    ) => {
      try {
        setSubmitting(true);
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        user
          ?.updateProfile({
            displayName: fullName,
          })
          .then(() => history.push(history.location.pathname));

        setAlert({
          show: true,
          severity: 'info',
          icon: false,
          message: 'Welcome on board 🚀',
        });
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
    [auth, setAlert, history],
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" className={classes.title}>
        Register
      </Typography>
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          password: '',
          repeatPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={({ email, fullName, password }, { setSubmitting }) => {
          handleSignUp(email, fullName, password, setSubmitting);
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
              id="text"
              name="fullName"
              label="Full name"
              variant="filled"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
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
                      onClick={handleShowPassword}
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
            <TextField
              className={classes.input}
              fullWidth
              id="password"
              name="repeatPassword"
              label="Repeat password"
              type={showRepeatPassword ? 'text' : 'password'}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowRepeatPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              helperText={
                formik.touched.repeatPassword && formik.errors.repeatPassword
              }
            />
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Auth;
