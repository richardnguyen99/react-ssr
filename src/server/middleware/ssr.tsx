/**
 * Server-side Rendering React middleware for Express
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { RequestHandler, Request, Response } from "express";
import { StaticRouterContext, matchPath } from "react-router";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloProvider } from "@apollo/react-hooks";
import SchemaLink from "apollo-link-schema";

import App from "@common/App";
import { createApolloClient } from "@common/utils/apolloLinks";
import schema from "@server/utils/gqlCombine";

interface HTMLProps {
  scripts: Array<string>;
  css: Array<string>;
  content: string;
  helmetContext: HelmetData;
  apolloStates: Record<string, unknown>;
}

const HTML: React.FC<HTMLProps> = ({
  scripts,
  css,
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
        {css.filter(Boolean).map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
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

const SSR = (): RequestHandler => (req: Request, res: Response): void => {
  // const baseUrl = `${req.protocol}://${req.get("Host")}`;
  const client = createApolloClient({ link: new SchemaLink({ schema }) });
  const context: StaticRouterContext = {};

  const jsx = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(jsx).then(() => {
    const content = renderToString(jsx);
    const helmet = Helmet.renderStatic();

    res.status(200);
    res.send(
      "<!doctype html>" +
        renderToString(
          <HTML
            content={content}
            css={[res.locals.assetPath("bundle.css")]}
            helmetContext={helmet}
            scripts={[
              res.locals.assetPath("bundle.js"),
              res.locals.assetPath("vendor.js"),
            ]}
            apolloStates={client.extract()}
          />
        )
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });
      res.end();
    }

    res.end();
  });
};

export default SSR;
