import React, { useContext } from 'react';
import { useAuth } from 'reactfire';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import validationSchema from './validationSchema';
import useStyles from './style';
import PasswordField from '../PasswordField';

const Register: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const classes = useStyles();

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
        if (user) {
          user.updateProfile({
            displayName: fullName,
          });
          setAlert({
            show: true,
            severity: 'info',
            icon: false,
            message: 'Welcome on board 🚀',
          });
        }
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
        <Typography variant="h1">Register</Typography>
      </Box>
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
            <TextField
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
            <PasswordField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <PasswordField
              id="repeatPassword"
              name="repeatPassword"
              label="Repeat password"
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
              className={classes.button}
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

export default Register;
