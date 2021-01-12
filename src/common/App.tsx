/**
 * Main React application
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Home, About, User, ErrorPage } from "@common/pages";

import favicon from "^config/assets/favicon.png";
import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Helmet
        defaultTitle="ReactQL - A Server-side-rendered React application"
        link={[{ rel: "icon", type: "image/png", href: favicon }]}
      />
      <Navbar>ReactQL</Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={User} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
};

export default App;
