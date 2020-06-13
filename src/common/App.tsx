/**
 * Main React application
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import HomeComponent from "./components/Home";
import AboutComponent from "./components/About";
import UserComponent from "./components/User";
import Test from "./components/Test";

import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/about" component={AboutComponent} />
        <Route exact path="/user" component={UserComponent} />
        <Route exact path="/test" component={Test} />
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
