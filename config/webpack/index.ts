/**
 * Lists of variables and functions to work with
 * Webpack configurations
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

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
    return [require("./client/dev").default, require("./server/dev").default];
  }

  process.env.NODE_ENV = "production";
  return [require("./client/prod").default, require("./server/prod").default];
};

export const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3500);
