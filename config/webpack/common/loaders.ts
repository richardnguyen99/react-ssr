/**
 * Defines loaders for Webpack
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

// const generateSourceMap = process.env.GENERATE_SOURCE !== "false";

const isProd = process.env.NODE_ENV === "production";

const babelLoader: webpack.RuleSetRule = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  loader: require.resolve("babel-loader"),
  options: {
    cacheDirectory: true,
    cacheCompression: isProd,
    compact: isProd,
  },
};

export const clientLoader = [babelLoader];

export const serverLoader = [babelLoader];
