/**
 * Lists of variables and functions to work with
 * Webpack configurations
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

import ClientDevConfig from "./client/dev";
import ServerDevConfig from "./server/dev";
import ClientProdConfig from "./client/prod";
import ServerProdConfig from "./server/prod";

/**
 * Takes a parameter as a env and returns a set of Webpack
 * configurations for both client and server based on the env.
 *
 * @param { Env } env Application environment, can be only either `development` or `production`.
 * @returns { webpack.Configuration[] } Set of Webpack configurations for both client and server
 */
export const getWebpackConfig = (env: string): webpack.Configuration[] => {
  if (env === "development") {
    process.env.NODE_ENV = "development";

    return [ClientDevConfig, ServerDevConfig];
  }

  process.env.NODE_ENV = "production";
  return [ClientProdConfig, ServerProdConfig];
};

export const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3500);
