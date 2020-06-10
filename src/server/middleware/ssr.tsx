/**
 * Server-side Rendering React middleware for Express
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { RequestHandler, Request, Response } from "express";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "@common/App";

interface HTMLProps {
  scripts: Array<string>;
  css?: Array<string>;
  content: string;
  helmetContext: HelmetData;
  apolloStates: Record<string, unknown>;
}

const HTML: React.FC<HTMLProps> = ({
  scripts,
  content,
  helmetContext,
  apolloStates,
}) => {
  const htmlAttrs = helmetContext.htmlAttributes.toComponent();
  const bodyAttrs = helmetContext.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmetContext.title.toComponent()}
        {helmetContext.meta.toComponent()}
        {helmetContext.link.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {scripts.filter(Boolean).map((src) => (
          <script key={src} src={src} />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              apolloStates
            ).replace(/>/g, "\\u003c")}`,
          }}
        />
      </body>
    </html>
  );
};

const SSR = (): RequestHandler => (req: Request, res: Response): Response => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "/graphql",
      // @ts-ignore
      fetch,
      credentials: "same-origin",
      headers: {
        cookie: req.header("set-cookie"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const content = renderToString(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
  const helmet = Helmet.renderStatic();

  return res.send(
    "<!doctype html>" +
      renderToString(
        <HTML
          content={content}
          helmetContext={helmet}
          scripts={[
            res.locals.assetPath("bundle.js"),
            res.locals.assetPath("vendor.js"),
          ]}
          apolloStates={client.extract()}
        />
      )
  );
};

export default SSR;
