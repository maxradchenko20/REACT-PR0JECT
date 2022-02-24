import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { InputTypes } from '../../utils/types';
import { TextField } from '@material-ui/core';

const Input: FC<InputTypes> = ({
  control,
  name,
  label,
  error,
  helperText,
  margin,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={error}
          helperText={helperText}
          {...props}
        />
      )}
    />
  );
};
export default Input;
