/**
 * Home component written in React
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";

import { ReactComponent as AppLogo } from "^config/assets/logo.svg";

const Home: React.FC = () => {
  return (
    <main className="master">
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
              A boilerplate for a React application server-side-rendered by
              Express, bundled by Webpack, powered by Apollo & MongoDB, styled
              with SCSS, secured by Stylelint/ESlint/Jest, written in
              Typescript.
            </p>
            <a
              href="https://github.com/richardnguyen99/react-ssr.git"
              className="btn btn--dark"
            >
              View source
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
