/**
 * Entry point for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { hydrate } from "react-dom";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-boost";

import App from "@common/App";
import createHistory from "@common/utils/store";
import { createApolloClient } from "@common/utils/apolloLinks";

const history = createHistory();

const client = createApolloClient({
  link: new HttpLink({ uri: "/api/graphql" }),
});

hydrate(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
