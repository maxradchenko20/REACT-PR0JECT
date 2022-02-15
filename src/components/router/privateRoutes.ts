import {RouteProps} from "react-router-dom";
import {BlogPage} from "../../containers/BlogPage/BlogPage";
import {ROUTE} from "./ROUTES";

const {BLOG} = ROUTE

export const privateRoutes: RouteProps[] = [
  {
    path: BLOG,
    component: BlogPage,
    exact: true
  }
]
