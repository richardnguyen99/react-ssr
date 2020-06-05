/**
 * Main React application
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import HomeComponent from "./components/Home";
import AboutComponent from "./components/About";
import ErrorComponent from "./components/Error";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/about" component={AboutComponent} />
        <Route component={ErrorComponent} />
      </Switch>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </>
  );
};

export default App;
