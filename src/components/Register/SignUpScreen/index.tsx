import React from 'react';
import RegisterForm from '../RegisterForm';
import GuestScreen from '../../GuestScreen';

const SignUpScreen: React.FC = () => {
  return (
    <>
      <GuestScreen>
        <RegisterForm />
      </GuestScreen>
    </>
  );
};

export default SignUpScreen;
