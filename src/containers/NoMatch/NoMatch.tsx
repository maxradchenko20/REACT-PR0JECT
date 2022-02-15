import React from 'react';
import {Redirect, useHistory, useLocation} from 'react-router';
import {ROUTE} from "../../components/router/ROUTES";

import {Result} from 'antd';
import Button from '@mui/material/Button';

export const NoMatch = () => {
  const location = useLocation();
  const history = useHistory();
  console.log('location  >>>>', location);

  const backHome = () => {
    history.push('/')
  }

  const {HOME} = ROUTE

  // @ts-ignore
  if (!location?.from?.pathname) return <Redirect to={HOME}/>

  return (
    <div className='page404'>
      <Result
        status='404'
        title='404'
        // @ts-ignore
        subTitle={`Страница ${location.from.pathname} не найдена`}
        extra={<Button onClick={backHome} variant="contained">Вернуться на главную</Button>}
      />
    </div>
  );
};
