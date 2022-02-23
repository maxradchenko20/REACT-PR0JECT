import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { TextField } from "@mui/material";
import { Control } from "react-hook-form/dist/types";
import { FieldPath } from "react-hook-form/dist/types/path/eager";
import { FieldErrors } from "react-hook-form/dist/types/errors";

type Props = {
  control: Control<any>;
  name: FieldPath<any>;
  label: string;
  props?: any;
  error?: FieldErrors<any>;
  helperText?: any;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  fullWidth?: any;
  variant?: any;
  className?: any;
  register?: any;
};

const Input: FC<Props> = ({
  control,
  name,
  label,
  error,
  helperText,
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
