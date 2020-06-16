/**
 * Home component written in React
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";

import { ReactComponent as AppLogo } from "^config/assets/logo.svg";

const Home: React.FC = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col--md-4 order--md-2">
            <AppLogo className="svg--fluid" />
          </div>
          <div className="col--md-8 order--md-1 ">
            <h1 className="text--lg text--black text--serif">
              ReactQL - A Server-side-rendered React Application.
            </h1>
            <p className="text--light">
              A React application server-side-rendered by Express with the
              support of Apollo, GraphQL, Webpack, SCSS & secured by Typescript.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
