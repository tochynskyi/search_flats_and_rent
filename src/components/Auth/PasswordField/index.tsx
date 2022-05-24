import React, { ChangeEventHandler, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  error: boolean | undefined;
  helperText: string | false | undefined;
}

const PasswordField: FC<PasswordFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      id={id}
      name={name}
      fullWidth
      label={label}
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
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default PasswordField;
