import React from 'react';
import AuthForm from '../AuthForm';
import GuestLayout from '../../Unknown/GuestLayout';

const SignInScreen: React.FC = () => {
  return (
    <GuestLayout>
      <AuthForm />
    </GuestLayout>
  );
};

export default SignInScreen;
