import React, { FC, useContext, useEffect } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { userContext } from "../../context/Context";
import { Controller, useForm } from "react-hook-form";
import { FormInputs } from "../../utils/types";
import { useHistory } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { createNewUser } from "../../api";

const schema = yup.object().shape({
  name: yup.string().min(2, "min 2").max(15, "max").required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  website: yup.string().required("required"),
});

export interface INewUser {
  name: string;
  email: string;
  username: string;
  website: string;
}

// @ts-ignore

const AddUser: FC = () => {
  const createNewUserMutation = useMutation("add-new-user", createNewUser, {
    onSuccess: (data) => {
      console.log(data);
      backUsersList();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const { users } = useContext(userContext);

  console.log(users);

  const form = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      website: "",
    },
  });

  const history = useHistory();

  const backUsersList = () => {
    history.push("/users");
  };

  const onSubmit = (data: INewUser) => {
    const employee = {
      ...data,
    };
    createNewUserMutation.mutate(employee);
  };

  // useEffect(() => {
  //   if (createNewUser.isSuccess) {
  //     backUsersList();
  //   }
  // }, [createNewUser.isSuccess]);

  // @ts-ignore
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center">
        {" "}
        Add new user
      </Typography>
      <IconButton aria-label="delete" size="small">
        <KeyboardReturnIcon fontSize="inherit" />
        <Link to="/users">Back to users list</Link>
      </IconButton>
      <div>
        {/*// @ts-ignore*/}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextField
                label="name"
                variant="outlined"
                {...field}
                error={!!form.formState.errors.name}
                helperText={
                  form.formState.errors.name
                    ? form.formState.errors.name?.message
                    : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field }) => (
              <TextField
                label="username"
                variant="outlined"
                {...field}
                error={!!form.formState.errors.username}
                helperText={
                  form.formState.errors.username
                    ? form.formState.errors.username?.message
                    : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <TextField
                label="email"
                variant="outlined"
                {...field}
                error={!!form.formState.errors.email}
                helperText={
                  form.formState.errors.email
                    ? form.formState.errors.email?.message
                    : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <TextField
                label="website"
                variant="outlined"
                {...field}
                error={!!form.formState.errors.website}
                helperText={
                  form.formState.errors.website
                    ? form.formState.errors.website?.message
                    : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />
          <IconButton aria-label="delete" size="medium" type="submit">
            <PersonAddAltIcon color="success" fontSize="medium" />
            Add user
          </IconButton>
        </form>
      </div>
    </Container>
  );
};

export default AddUser;
