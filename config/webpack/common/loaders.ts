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
    plugins: [
      [
        require.resolve("babel-plugin-named-asset-import"),
        {
          loaderMap: {
            svg: {
              ReactComponent: "@svgr/webpack?-prettier,-svgo![path]",
            },
          },
        },
      ],
    ],
    cacheDirectory: true,
    cacheCompression: isProd,
    compact: isProd,
  },
};

const urlLoaderClient: webpack.RuleSetRule = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "assets/[name]:[hash:8].[ext]",
  },
};

const urlLoaderServer: webpack.RuleSetRule = {
  ...urlLoaderClient,
  options: {
    // @ts-ignore
    ...urlLoaderClient.options,
    emitFile: false,
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
  urlLoaderClient,
];

export const serverLoader = [
  babelLoader,
  fileLoader,
  graphqlLoader,
  cssLoaderServer,
  urlLoaderServer,
];
