import React, {ChangeEvent, FC, useContext} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import {SimpleCtx} from "../../context/Context";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, TextField, Toolbar,} from "@material-ui/core";


const useClasses = makeStyles({
  table: {
    minWidth: 650
  },
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
});

interface IFormInputs {
  searchValue: string;
}

const schema = yup.object({
  searchValue: yup.string().required(),
}).required();


export const Form: FC = () => {
  const {products, setProducts, searchValue, setSearchValue} = useContext(SimpleCtx)

  const classes = useClasses();

  //FORM
  const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              // onChange={onChange}
              variant="standard"
              className={classes.searchInput}
              type="search"
              autoComplete='off'
              label="Search..."
              inputProps={{
                maxLength: 10
              }}
              helperText={errors.searchValue ? errors.searchValue?.message : ''}

              {...register("searchValue")}
            />
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              onClick={() => reset()}
            >
              Search
            </Button>
          </form>
        </div>
      </Toolbar>
    </AppBar>

  )
}