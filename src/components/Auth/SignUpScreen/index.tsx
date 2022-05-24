import React from 'react';
import RegisterForm from '../RegisterForm';
import GuestLayout from '../../Unknown/GuestLayout';

const SignUpScreen: React.FC = () => {
  return (
    <GuestLayout>
      <RegisterForm />
    </GuestLayout>
  );
};

export default SignUpScreen;
