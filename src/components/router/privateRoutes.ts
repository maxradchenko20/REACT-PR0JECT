import { RouteProps } from "react-router-dom";
import BlogPage from "../../containers/BlogPage";
import { ROUTE } from "./ROUTES";
import AddUser from "../../containers/AddUser/";
import UpdateUser from "../../containers/UpdateUser/UpdateUser";

const { USERS, USERS_ADD, EDIT_USER } = ROUTE;

export const privateRoutes: RouteProps[] = [
  {
    path: USERS,
    component: BlogPage,
    exact: true
  },
  {
    path: USERS_ADD,
    component: AddUser,
    exact: true
  },
  {
    path: EDIT_USER,
    component: UpdateUser,
    exact: true
  }
];
