/**
 * Main React application
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import { Home, About, User, ErrorPage } from "@common/pages";

import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Navbar>ReactQL</Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={User} />
        <Route component={ErrorPage} />
      </Switch>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
    </>
  );
};

export default App;
