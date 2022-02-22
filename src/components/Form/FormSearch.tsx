import React, {FC, useContext, useEffect, useState} from "react";
import axios from 'axios';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Link} from 'react-router-dom';
import {yupResolver} from "@hookform/resolvers/yup";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar,} from "@material-ui/core";
import {userContext} from "../../context/Context";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
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
    username: string;
    name?: string;
    email?: string;
    website?: string;
    id?: any;

}

const schema = yup.object().shape({
    userName: yup.string().required(),
});


export const FormSearch: FC = () => {

    const classes = useClasses();


    //FORM
    const form = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: ''
        }
    })


    // const searchUserMutation = useMutation('get-user', getUsers, {
    //     onSuccess: (data) => {
    //         setUsers(data.data);
    //         console.log(data.data)
    //     }
    // });

    // const onSubmit: SubmitHandler<IFormInputs> = (data: any) => {
    //     searchUserMutation.mutate(data.userName);
    // }


    return (
        <AppBar position="static">
            <Toolbar>
                <div className={classes.searchContainer}>
                    <form className={classes.form}>
                        <div className={classes.form_children}>
                            <SearchIcon className={classes.searchIcon}/>
                            {/*<Controller control={form.control} name="userName" render={({field}) => {*/}
                            {/*    return <TextField {...field} label="Search by name..."/>*/}
                            {/*}}/>*/}
                            {/*<MyInput control={form.control} name="userName" label="Search by name..."/>*/}



                        </div>
                    </form>
                </div>
            </Toolbar>
        </AppBar>
    )
}