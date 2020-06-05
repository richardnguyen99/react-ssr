/**
 * Entry point for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { hydrate } from "react-dom";
import { Router } from "react-router-dom";

import App from "@common/App";
import createHistory from "@common/utils/store";

const history = createHistory();

hydrate(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
