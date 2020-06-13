/**
 * Common webpack configuration for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

import paths from "^config/paths";
import { clientLoader } from "^config/webpack/common/loaders";
import resolvers from "../common/resolvers";
import { clientPlugins, commonPlugins } from "../common/plugins";

const config: webpack.Configuration = {
  name: "client",
  target: "web",
  entry: {
    bundle: [paths.clientSrc],
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: "bundle.js",
    publicPath: paths.publicPath,
    chunkFilename: "[name].[chunkhash:8].chunk.js",
  },
  module: {
    rules: clientLoader,
  },
  resolve: resolvers,
  plugins: [...commonPlugins, ...clientPlugins],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // TerserPlugin config is taken entirely from react-scripts
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};

export default config;
