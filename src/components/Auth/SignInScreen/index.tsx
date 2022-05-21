import React from 'react';
import AuthForm from '../AuthForm';
import GuestScreen from '../../GuestScreen';

const SignInScreen: React.FC = () => {
  return (
    <>
      <GuestScreen>
        <AuthForm />
      </GuestScreen>
    </>
  );
};

export default SignInScreen;
