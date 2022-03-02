import React, { FC, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { getItLocalStorage, userContext } from "./context/Context";
import { publicRoutes } from "./components/router/publicRoutes";
import { privateRoutes } from "./components/router/privateRoutes";
import { error } from "./components/router/errorRoutes";
import { User } from "./utils/types";

export const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getItLocalStorage("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(getItLocalStorage("userName"));
  const [users, setUsers] = useState<Array<User>>([]);
  
  return (
    <userContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        users,
        setUsers
      }}
    >
      <Router>
        <>
          <Header />
          <main>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if (isLoggedIn) return <Redirect to="/users" />;
                  return <Redirect to="/login" />;
                }}
              />

              {publicRoutes.map(({ component: Component, ...route }) => (
                <Route
                  {...route}
                  // @ts-ignore
                  render={(...props) => <Component {...props} />}
                />
              ))}

              {privateRoutes.map(({ component: Component, ...route }) => (
                <Route
                  {...route}
                  // @ts-ignore
                  render={(...props) => <Component {...props} />}
                />
              ))}

              {error.map(({ component: Component, ...route }) => (
                <Route
                  {...route}
                  // @ts-ignore
                  render={(...props) => <Component {...props} />}
                />
              ))}

              <Route
                path="*"
                render={({ location }) => {
                  return (
                    <Redirect
                      to={{
                        pathname: "/404",
                        // @ts-ignore
                        from: location
                      }}
                    />
                  );
                }}
              />
            </Switch>
          </main>
          <Footer year={new Date().getFullYear()} />
        </>
      </Router>
    </userContext.Provider>
  );
};
