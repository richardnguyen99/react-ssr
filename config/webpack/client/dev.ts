/**
 * Development Webpack configuration for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";
import WriteFileWebpackPlugin from "write-file-webpack-plugin";

import CommonConfig from "./common";

const config: webpack.Configuration = {
  ...CommonConfig,
  plugins: [
    ...CommonConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new WriteFileWebpackPlugin(),
  ],
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  performance: {
    hints: false,
  },
};

export default config;
