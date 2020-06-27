/**
 * Main React application
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Home, About, User, ErrorPage, Login, Register } from "@common/pages";

import favicon from "^config/assets/favicon.png";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider, { UserContext } from "./contexts/User";
import { setAccessToken } from "./utils/tokenStore";
import "./styles/global.scss";

// Use RouteProps to make this component like Route component
const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const authContext = useContext(UserContext);

  const { state } = authContext;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !state.isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

interface TokenResponse {
  message: string;
  success: boolean;
  data: {
    accessToken: string;
  };
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/api/refresh_token`
        : "/api/refresh_token";

    fetch(url, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const payload = (await res.json()) as TokenResponse;

      if (payload.data) {
        setAccessToken(payload.data.accessToken);
      }

      setLoading(false);
    });
  }, []);

  return (
    <AuthProvider>
      <Helmet
        defaultTitle="ReactQL - A Server-side-rendered React application"
        link={[{ rel: "icon", type: "image/png", href: favicon }]}
      />
      <Navbar>ReactQL</Navbar>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      )}
    </AuthProvider>
  );
};

export default App;
