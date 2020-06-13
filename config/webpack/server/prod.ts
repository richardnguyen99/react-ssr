/**
 * Production Webpack configuration for server side
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

import CommonConfig from "./common";

const config: webpack.Configuration = {
  ...CommonConfig,
  mode: "production",
};

export default config;
