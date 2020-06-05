/**
 * Production Webpack configuration for client side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

import CommonConfig from "./common";

const config: webpack.Configuration = {
  ...CommonConfig,
  mode: "production",
  devtool: "source-map",

  output: {
    filename: "bundle.[hash:8].js",
  },
};

export default config;
