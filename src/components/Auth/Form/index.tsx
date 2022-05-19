import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { UIContext } from '../../Unknown/UIContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAlert } = useContext(UIContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = React.useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error: any) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
      setLoading(false);
    },
    [setAlert],
  );

  return (
    <Container fixed maxWidth="lg">
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: '40px', fontWeight: '700', marginBottom: '90px' }}
      >
        Login
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }) => {
          handleSignIn(email, password);
        }}
      >
        {(formik) => (
          <Form>
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
              sx={{ marginBottom: '50px' }}
            />
            <TextField
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
              sx={{ marginBottom: '50px' }}
            />
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                height: '42px',
                color: '#fff',
              }}
              disabled={loading}
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
