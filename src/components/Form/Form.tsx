import React, {FC, useContext} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link} from 'react-router-dom';
import {yupResolver} from "@hookform/resolvers/yup";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar,} from "@material-ui/core";
import {useMutation} from "react-query";
import {getUsers} from "../../shared/queries";
import {userContext} from "../../context/Context";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {MyInput} from "../addUser/AddUser";
import IconButton from "@material-ui/core/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import '../../index.css'

const useClasses = makeStyles({
    table: {
        minWidth: 650
    },
    pokedexContainer: {
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: 5,
    },
    searchInput: {
        width: 300,
        margin: 5,
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

export interface IFormInputs {
    userName: string;
    name?: string;
    email?: string;
    website?: string;
    id?: any;
}

const schema = yup.object().shape({
    userName: yup.string().required(),
});


export const Form: FC = () => {
    const {setUsers} = useContext(userContext);

    const classes = useClasses();

    //FORM
    const form = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            userName: ''
        }
    });


    const searchUserMutation = useMutation('get-user', getUsers, {
        onSuccess: (data) => {
            setUsers(data.data);
            console.log(data.data)
        }
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data: any) => {
        searchUserMutation.mutate(data.userName);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <div className={classes.searchContainer}>
                    <form className={classes.form} onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={classes.form_children}>
                            <SearchIcon className={classes.searchIcon}/>
                            {/*<Controller control={form.control} name="userName" render={({field}) => {*/}
                            {/*    return <TextField {...field} label="Search by name..."/>*/}
                            {/*}}/>*/}
                            <MyInput control={form.control} name="userName" label="Search by name..."/>
                            <Button variant="contained" endIcon={<SendIcon/>}>
                                Send
                            </Button>
                        </div>
                        <Link to="/users/new-user">
                            <IconButton size="medium" type="submit">
                                <PersonAddAltIcon color="error" fontSize="inherit"/>
                                Add user
                            </IconButton>
                        </Link>
                    </form>
                </div>
            </Toolbar>
        </AppBar>
    )
}