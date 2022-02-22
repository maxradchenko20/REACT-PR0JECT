import {RouteProps} from "react-router-dom";
import NoMatch from "../../containers/NoMatch";
import {ROUTE} from "./ROUTES";

const {ERROR} = ROUTE

export const error: RouteProps[] = [
  {
    path: ERROR,
    component: NoMatch,
    exact: true
  }
]