import * as React from 'react';
import {useContext} from 'react';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useHistory} from "react-router";
import {Controller, useForm} from "react-hook-form";
import {userContext} from "../../context/Context";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';

const useClasses = makeStyles({
  loginForm: {
    width: 'max-content',
    padding: 20,
    margin: '0 auto',
    textAlign: 'center',
  }
})

const setItLocalStorage = (key: string, val: any): void => localStorage.setItem(key, JSON.stringify(val));

const schema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().min(6, 'min 6').max(20, 'max').required('required'),
});

const defaultValues = {
  email: "",
  password: "",
}
export

 const LoginPage = () => {
  const {loginForm} = useClasses();

  const {setIsLoggedIn, setUserName} = useContext(userContext)




  const history = useHistory()

  const form = useForm({
    resolver: yupResolver(schema), defaultValues
  });
  const handleLogIn = (formData: any) => {
    setItLocalStorage('isLoggedIn', true)

    setItLocalStorage('userName', formData.email)

    setUserName(formData.email);
    setIsLoggedIn(true);
    history.push('/');
  }

  return (
    <>
      <form className={loginForm} onSubmit={form.handleSubmit(handleLogIn)}>
        <Typography variant="subtitle1" gutterBottom component="div" className="auth-form__subtitle">
          Login
        </Typography>
        <Controller
          name="email"
          control={form.control}
          render={({field}) => (
            <TextField
              label="Email"
              variant="outlined"
              {...field}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email ? form.formState.errors.email?.message : ''}
              fullWidth
              margin="dense"
            />
          )}
        />
        <br/>
        <Controller
          name="password"
          control={form.control}
          render={({field}) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password ? form.formState.errors.password?.message : ''}
              fullWidth={true}
              margin="dense"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2
          }}
        >
          Log
        </Button>
      </form>
    </>
  );
};

export default {LoginPage};