import React, { FC, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { searchUser } from "../../api";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputs } from "../../utils/types";
import { userContext } from "../../context/Context";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@material-ui/core/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import "../../index.css";

const useClasses = makeStyles({
  table: {
    minWidth: 650,
  },
  searchContainer: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
});

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const FormSearch: FC = () => {
  const classes = useClasses();
  const { setUsers } = useContext(userContext);

  const form = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const searchUserMutation = useMutation("search-by-name", searchUser, {
    onSuccess: (data) => {
      setUsers(data.data);
    },
  });

  const onSubmit = (data: any) => {
    searchUserMutation.mutate(data.name);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.searchContainer}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              control={form.control}
              name="name"
              type="text"
              label="name"
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => searchUserMutation}
            >
              Search
            </Button>
            <Link to="/users/new-user">
              <IconButton size="medium" type="submit">
                <PersonAddAltIcon color="error" fontSize="inherit" />
                Add user
              </IconButton>
            </Link>
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
};
