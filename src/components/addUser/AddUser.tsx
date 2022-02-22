import React, {FC} from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Container from '@mui/material/Container';

import {IFormInputs} from "../Form/FormSearch";
import {TextField} from "@material-ui/core";
import {FieldPath} from "react-hook-form/dist/types/path/eager";
import {Control} from "react-hook-form/dist/types";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {makeStyles} from "@material-ui/core/styles";


const schema = yup.object().shape({
    name: yup.string().min(6, 'min 6').max(15, 'max').required('required'),
    userName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    website: yup.string().required('required'),


});

type MyInputProps = {
    control: Control<any>,
    name: FieldPath<any>,
    label: string,
    props?: any,
    error?: FieldErrors<any>,
    helperText?: any,
    type?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
    // value?: any,
}

const useClasses = makeStyles({
    form_container: {},

})


export const MyInput: FC<MyInputProps> = ({control, name, label, error, helperText, ...props}) => {
    return <Controller control={control} name={name}
                       render={({field}) => <TextField {...field} label={label} error={error}
                                                       helperText={helperText}  {...props}/>}/>
}

const AddUser: FC = () => {

    const {form_container} = useClasses();

    const form = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            website: '',
        }
    });

    const onSubmit = (data: MyInputProps): void => console.log(data)

    return (
        <Container className={form_container} maxWidth="sm">
            <Typography variant="h3" align="center"> Add new user</Typography>
            <IconButton aria-label="delete" size="small">
                <KeyboardReturnIcon fontSize="inherit"/>
                <Link to="/users">Back to users list</Link>
            </IconButton>
            <div>
                {/*<form onSubmit={form.handleSubmit(onSubmit)}>*/}
                {/*    <Controller control={form.control} name="name" render={({field}) => {*/}
                {/*        return <TextField {...field} label="user name"/>*/}
                {/*    }}/>*/}
                {/*</form>*/}
                {/* @ts-ignore*/}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <MyInput control={form.control}
                             error={!!form.formState.errors.name}
                             helperText={form.formState.errors.name ? form.formState.errors.name?.message : ''}
                             name="name"
                             label="name"/><br/>
                    <MyInput control={form.control}
                             error={!!form.formState.errors.username}
                             helperText={form.formState.errors.username ? form.formState.errors.username?.message : ''}
                             name="userName"
                             label="userName"/><br/>
                    <MyInput control={form.control}
                             error={!!form.formState.errors.email}
                             helperText={form.formState.errors.email ? form.formState.errors.email?.message : ''}
                             name="email"
                             label="email"/><br/>
                    <MyInput control={form.control}
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
