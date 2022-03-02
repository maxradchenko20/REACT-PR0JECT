import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import { userContext } from "../../context/Context";
import { User } from "../../utils/types";
import { createNewUser } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schema } from "utils/validator";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Container } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@mui/material/Typography";
import Input from "../../components/Input";

const AddUser: FC = () => {
  const { users } = useContext(userContext);
  const history = useHistory();

  const backToUsersList = () => {
    history.push("/users");
  };

  const createNewUserMutation = useMutation("add-new-user", createNewUser, {
    onSuccess: (data) => {
      console.log(data);
      // @ts-ignore
      alert("User add");
      backToUsersList();
    },
    onError: () => {
      alert("there was an error");
    }
  });

  console.log(users);

  const form = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      website: ""
    }
  });

  const onSubmit = (data: User) => {
    const newUser = {
      ...data
    };
    createNewUserMutation.mutate(newUser);
  };

  // useEffect(() => {
  //   if (createNewUser.isSuccess) {
  //     backUsersList();
  //   }
  // }, [createNewUser.isSuccess]);

  // @ts-ignore

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center">
        Add new user
      </Typography>
      <IconButton aria-label="delete" size="small">
        <KeyboardReturnIcon fontSize="inherit" />
        <Link to="/users">Back to users list</Link>
      </IconButton>
      <div>
        {/*// @ts-ignore*/}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            name="name"
            control={form.control}
            label="Name"
            helperText={
              form.formState.errors.name
                ? form.formState.errors.name?.message
                : ""
            }
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <Input
            name="username"
            control={form.control}
            label="Username"
            error={!!form.formState.errors.username}
            helperText={
              form.formState.errors.username
                ? form.formState.errors.username?.message
                : ""
            }
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <Input
            name="email"
            control={form.control}
            label="Email"
            error={!!form.formState.errors.email}
            helperText={
              form.formState.errors.email
                ? form.formState.errors.email?.message
                : ""
            }
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <Input
            name="website"
            control={form.control}
            label="Website"
            error={!!form.formState.errors.website}
            helperText={
              form.formState.errors.website
                ? form.formState.errors.website?.message
                : ""
            }
            variant="outlined"
            fullWidth
            margin="dense"
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
