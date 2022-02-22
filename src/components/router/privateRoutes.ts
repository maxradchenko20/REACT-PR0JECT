import {RouteProps} from "react-router-dom";
import BlogPage from "../../containers/BlogPage";
import {ROUTE} from "./ROUTES";
import AddUser from "../../containers/addUser/";

const {USERS, USERS_ADD} = ROUTE

export const privateRoutes: RouteProps[] = [
    {
        path: USERS,
        component: BlogPage,
        exact: true
    },
    {
        path: USERS_ADD,
        component: AddUser,
        exact: true,
    }
]
