/**
 * Common webpack configuration for server side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import path from "path";
import webpack from "webpack";
import WebpackNodeExternals from "webpack-node-externals";

import paths from "^config/paths";
import resolvers from "../common/resolvers";
import { serverLoader } from "../common/loaders";
import { serverPlugins } from "../common/plugins";

const config: webpack.Configuration = {
  name: "server",
  target: "node",
  entry: {
    server: [
      require.resolve("core-js/stable"),
      require.resolve("regenerator-runtime/runtime"),
      path.resolve(paths.serverSrc, "server.ts"),
    ],
  },
  externals: [
    WebpackNodeExternals({
      whitelist: /\.css$/,
    }),
  ],
  output: {
    path: paths.serverBuild,
    filename: "server.js",
    publicPath: paths.publicPath,
  },
  resolve: resolvers,
  module: {
    rules: serverLoader,
  },
  plugins: [...serverPlugins],
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  node: {
    __dirname: false,
  },
};

export default config;
