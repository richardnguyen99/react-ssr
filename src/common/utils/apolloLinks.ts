/**
 * Creates Apollo links to handle GraphQL data
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";

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
