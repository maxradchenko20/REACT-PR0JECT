import React, {FC, useContext, useEffect, useRef, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getUsers} from "../../shared/queries";
import {deleteUser, searchUser} from "../../api";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {MyInput} from "../addUser/AddUser";
import {useForm} from "react-hook-form";
import {IFormInputs} from "../Form/FormSearch";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {userContext} from "../../context/Context";

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650
//     },
//     pokedexContainer: {
//         paddingTop: 20,
//         paddingLeft: 50,
//         paddingRight: 50,
//     },
//     cardContent: {
//         textAlign: "center",
//     },
//     searchContainer: {
//         display: "flex",
//         paddingLeft: 20,
//         paddingRight: 20,
//         marginTop: 5,
//         marginBottom: 5,
//     },
//     searchIcon: {
//         alignSelf: "flex-end",
//         marginBottom: 5,
//     },
//     searchInput: {
//         width: 200,
//         margin: 5,
//     },
//     headerTable: {
//         backgroundColor: '#000000',
//     }
// });

const URL = 'http://localhost:4000/api';

axios.defaults.baseURL = URL;
axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*'
}

const TableHeader: FC = () => {
    const rowArr = [
        {id: "ID", email: "Email", name: "Name", website: "Website", username: "Username", actions: 'Actions'}
    ]

    return (
        <TableHead style={{backgroundColor: 'silver'}}>
            {rowArr.map((row) => (
                <TableRow key={row.id}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.website}</TableCell>
                    <TableCell align="right">{row.actions}</TableCell>
                </TableRow>
            ))}
        </TableHead>
    )
}


export const BasicTable: FC = () => {
    const client = useQueryClient();

    const deleteMutation = useMutation('delete-user', deleteUser, {
        onSuccess: () => {
            client.invalidateQueries('get-users');
        }
    })

    const deleteHandler = (id: string) => () => {
        console.log(id);
        deleteMutation.mutate(id);
    }

    const {setUsers, users, userName} = useContext(userContext);

    const [userNameSearch, setUserNameSearch] = useState('');

    const searchUserMutation = useMutation('search-by-name', searchUser, {
        onSuccess: (data) => {
            setUsers(data.data)
        }
    });

    const onSubmit = (data: any) => {
        searchUserMutation.mutate(data.name);
    }

    const filteredNames = users.map((user: any) => {
        return user?.name?.toLowerCase().includes(userNameSearch.toLowerCase())
    })

    const schema = yup.object().shape({
        name: yup.string().required(),
    });


    const form = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: ''
        }
    })

    return (
        <>
            <Paper>
                <TableContainer>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <MyInput control={form.control}
                                 name="name"
                            // @ts-ignore
                                 type="text"
                                 label="name"/>
                        <Button type="submit" variant="contained" endIcon={<SendIcon/>}
                                onClick={() => searchUserMutation}>
                            Search
                        </Button>
                        <Link to="/users/new-user">
                            <IconButton size="medium" type="submit">
                                <PersonAddAltIcon color="error" fontSize="inherit"/>
                                Add user
                            </IconButton>
                        </Link>
                    </form>
                    <Table style={{minWidth: 650}} aria-label="simple table">
                        <TableHeader/>
                        <TableBody>
                            {users.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell align="right">{user.id}</TableCell>
                                    <TableCell align="right">{user.name}</TableCell>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.website}</TableCell>
                                    <TableCell align="right">
                                        <button onClick={deleteHandler(user.id)}>
                                            <DeleteOutlineIcon/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}
