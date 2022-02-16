import React, {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {getItLocalStorage, SimpleCtx} from "./context/Context";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import {publicRoutes} from "./components/router/publicRoutes";
import {privateRoutes} from "./components/router/privateRoutes";
import {error} from "./components/router/errorRoutes";
import {User} from "../utils/State";
import axios from "axios";
import {useQuery} from "react-query";


export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getItLocalStorage("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(getItLocalStorage("userName"));
  const [products, setProducts] = useState<Array<User>>([]);
  const [searchValue, setSearchValue] = useState('')

  return (
    <SimpleCtx.Provider
      value={{isLoggedIn, setIsLoggedIn, userName, setUserName, products, setProducts, searchValue, setSearchValue}}>
      <Router>
        <>
          <Header/>
          <main>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if (isLoggedIn) return <Redirect to="/blog"/>;
                  return <Redirect to="/login"/>;
                }}
              />

              {publicRoutes.map(({
                                   component: Component,
                                   ...route
                                 }) => <Route
                {...route}
                // @ts-ignore
                render={(...props) => <Component {...props} />}/>)}

              {privateRoutes.map(({
                                    component: Component,
                                    ...route
                                  }) => <Route
                {...route}
                // @ts-ignore
                render={(...props) => <Component {...props} />}/>)}

              {error.map(({
                            component: Component,
                            ...route
                          }) => <Route
                {...route}
                // @ts-ignore
                render={(...props) => <Component {...props} />}/>)}


              <Route path="*"
                     render={({location}) => {
                       return <Redirect to={{
                         pathname: '/404',
                         // @ts-ignore
                         from: location
                       }}/>
                     }}
              />
            </Switch>
          </main>
          <Footer year={new Date().getFullYear()}/>
        </>
      </Router>
    </SimpleCtx.Provider>
  );
}
