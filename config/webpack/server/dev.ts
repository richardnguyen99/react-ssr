/**
 * Development webpack configuration for server side
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
  performance: {
    hints: false,
  },
};

export default config;
