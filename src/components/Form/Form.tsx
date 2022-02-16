import React, {ChangeEvent, FC, useContext, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import {SimpleCtx} from "../../context/Context";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, TextField, Toolbar,} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';


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
    width: '100%',
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "300px",
    margin: "5px",
  },
  form: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form_children: {
    display: 'flex',
    alignItems: 'center'
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

  //Basic search
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.searchContainer}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.form_children}>
              <SearchIcon className={classes.searchIcon}/>
              <TextField
                type="search"
                variant="standard"
                className={classes.searchInput}
                autoComplete='off'
                label="Search by name..."
                inputProps={{
                  maxLength: 10
                }}
                // helperText={errors.searchValue ? errors.searchValue?.message : ''}
                {...register("searchValue")}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className={classes.form_children}>
              <Button
                style={{marginRight: 10}}
                type="submit"
                variant="contained"
                color="inherit"
                onClick={() => console.log(searchValue)}
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        <a href=""> <AddIcon style={{color: 'white'}}/></a>
      </Toolbar>
    </AppBar>
  )
}