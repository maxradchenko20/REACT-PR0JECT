import React from "react";
import {Control} from "react-hook-form/dist/types";
import {FieldPath} from "react-hook-form/dist/types/path/eager";
import {FieldErrors} from "react-hook-form/dist/types/errors";


export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export type Input = {
  control: Control<any>,
  name: FieldPath<any>,
  label: string,
  props?: any,
  error?: FieldErrors<any>,
  helperText?: any,
  type?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
}

export type FormInputs = {
  username: string;
  name?: string;
  email?: string;
  website?: string;
  id?: any;
}