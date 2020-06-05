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

import App from "@common/App";

interface HTMLProps {
  scripts: Array<string>;
  css?: Array<string>;
  content: string;
  helmetContext: HelmetData;
}

const HTML: React.FC<HTMLProps> = ({ scripts, content, helmetContext }) => {
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
      </body>
    </html>
  );
};

const SSR = (): RequestHandler => (req: Request, res: Response) => {
  const content = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  return res.send(
    `<!doctype html>` +
      renderToString(
        <HTML
          content={content}
          helmetContext={helmet}
          scripts={[
            res.locals.assetPath("bundle.js"),
            res.locals.assetPath("vendor.js"),
          ]}
        />
      )
  );
};

export default SSR;
