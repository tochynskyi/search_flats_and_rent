import React, { useContext } from 'react';
import { useAuth } from 'reactfire';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import validationSchema from './validationSchema';
import PasswordField from '../PasswordField';
import useStyles from './style';

const AuthForm: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const classes = useStyles();

  const handleSignIn = React.useCallback(
    async (
      email: string,
      password: string,
      setSubmitting: (isSubmitting: boolean) => void,
    ) => {
      try {
        setSubmitting(true);
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
          setSubmitting(false);
        } else {
          setAlert({
            show: true,
            severity: 'error',
            message: 'Something wrong!',
          });
          setSubmitting(false);
        }
      }
    },
    [auth, setAlert],
  );

  return (
    <Container maxWidth="lg">
      <Box className={classes.title}>
        <Typography variant="h1">Login</Typography>
      </Box>
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
          <Form className={classes.formContainer}>
            <TextField
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
            <PasswordField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              className={classes.button}
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
