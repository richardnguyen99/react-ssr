/**
 * Entry point for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { hydrate } from "react-dom";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink, ApolloLink, Observable } from "apollo-boost";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { onError } from "apollo-link-error";
import jwt from "jsonwebtoken";

import App from "@common/App";
import createHistory from "@common/utils/store";
import { createApolloClient } from "@common/utils/apolloLinks";
import { getAccessToken, setAccessToken } from "@common/utils/tokenStore";

const history = createHistory();

const httpLink = () => new HttpLink({ uri: "/api/graphql" });

const errorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        console.log(extensions);
      });
    }

    if (networkError) {
      console.log(networkError);
    }
  });

const authLink = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;

        Promise.resolve(operation)
          .then((operation) => {
            const accessToken = getAccessToken();

            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

const tokenLink = () =>
  new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        //@ts-ignore
        const { exp } = jwt.decode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/api/refresh_token`
          : "/api/refresh_token";

      return fetch(url, {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: () => {
      console.warn("invalid refesh_token");
    },
  }) as any;

const client = createApolloClient({
  link: ApolloLink.from([tokenLink(), errorLink(), authLink(), httpLink()]),
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
