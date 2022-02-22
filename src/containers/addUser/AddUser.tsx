import React, {FC} from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Container from '@mui/material/Container';

import Input from "../../components/Input";
import {FormInputs} from "../../utils/types";

const schema = yup.object().shape({
  name: yup.string().min(6, 'min 6').max(15, 'max').required('required'),
  userName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  website: yup.string().required('required'),
});

const AddUser: FC = () => {

  const form = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      website: '',
    }
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center"> Add new user</Typography>
      <IconButton aria-label="delete" size="small">
        <KeyboardReturnIcon fontSize="inherit"/>
        <Link to="/users">Back to users list</Link>
      </IconButton>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input control={form.control}
                 error={!!form.formState.errors.name}
                 helperText={form.formState.errors.name ? form.formState.errors.name?.message : ''}
                 name="name"
                 label="name"/><br/>
          <Input control={form.control}
                 error={!!form.formState.errors.username}
                 helperText={form.formState.errors.username ? form.formState.errors.username?.message : ''}
                 name="userName"
                 label="userName"/><br/>
          <Input control={form.control}
                 error={!!form.formState.errors.email}
                 helperText={form.formState.errors.email ? form.formState.errors.email?.message : ''}
                 name="email"
                 label="email"/><br/>
          <Input control={form.control}
                 error={!!form.formState.errors.website}
                 helperText={form.formState.errors.website ? form.formState.errors.website?.message : ''}
                 name="website"
                 label="website"/> <br/>
          <IconButton aria-label="delete" size="medium" type="submit">
            <PersonAddAltIcon color="success" fontSize="medium"/>
            Add user
          </IconButton>
        </form>
      </div>
    </Container>
  );
};

export default AddUser;
