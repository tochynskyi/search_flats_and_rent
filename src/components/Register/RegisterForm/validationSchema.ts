import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup
    .string()
    .matches(/([A-Z][\w-]*(\s+[A-Z][\w-]*)+)/, {
      message: 'Must match your name and last name in capital letters',
      excludeEmptyString: false,
    })
    .required('Full name is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Repeat password is required'),
});

export default validationSchema;
