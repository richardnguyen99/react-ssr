/**
 * Creates Apollo links to handle GraphQL data
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-client";

import { logMessage } from "^config";

export const authLink = (): ApolloLink =>
  setContext((_, { headers }) => {
    const accessToken = "CHANGE_THIS";

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

export const errorLink = (): ApolloLink =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        logMessage(graphQLError, "error");
      });
    }

    if (networkError) {
      logMessage(networkError, "error");
    }
  });

export const createApolloClient = ({
  link,
}: {
  link: ApolloLink;
}): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache();

  if (!__SERVER__) {
    cache.restore((window as any).__APOLLO_STATE__);
  }

  return new ApolloClient({
    cache,
    link,
    ssrMode: __SERVER__,
  });
};
