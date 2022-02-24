import { RouteProps } from 'react-router-dom';
import LoginPage from '../../containers/LoginPage/LoginPage';
import { ROUTE } from './ROUTES';

const { LOGIN } = ROUTE;

export const publicRoutes: RouteProps[] = [
  {
    path: LOGIN,
    component: LoginPage,
    exact: true
  }
];
