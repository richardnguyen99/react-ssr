/**
 * Defines loaders for Webpack
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";
import MiniCSSExtractedPlugin from "mini-css-extract-plugin";

// const generateSourceMap = process.env.GENERATE_SOURCE !== "false";

const isProd = process.env.NODE_ENV === "production";

const cssLoaderClient: webpack.RuleSetRule = {
  test: /\.s[ac]ss$/i,
  use: [
    "style-loader",
    MiniCSSExtractedPlugin.loader,
    "css-loader",
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
      },
    },
  ],
};

const cssLoaderServer: webpack.RuleSetRule = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCSSExtractedPlugin.loader,
    require.resolve("css-loader"),
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
      },
    },
  ],
};

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

const fileLoader: webpack.RuleSetRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: ["file-loader"],
};

const graphqlLoader: webpack.RuleSetRule = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: "graphql-tag/loader",
};

export const clientLoader = [
  babelLoader,
  fileLoader,
  graphqlLoader,
  cssLoaderClient,
];

export const serverLoader = [
  babelLoader,
  fileLoader,
  graphqlLoader,
  cssLoaderServer,
];
