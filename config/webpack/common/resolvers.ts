/**
 * Define resolvers for Webpack
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";

import paths from "^config/paths";

const resolvers: webpack.Resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  modules: [
    paths.serverSrc,
    paths.clientSrc,
    paths.commonSrc,
    paths.source,
    "node_modules",
  ],
  alias: {
    react: require.resolve("react"),
    "react-dom": require.resolve("react-dom"),
    "react-router": require.resolve("react-router"),
    "react-router-dom": require.resolve("react-router-dom"),
    "@server": paths.serverSrc,
    "@client": paths.clientSrc,
    "@common": paths.commonSrc,
    "^config": paths.config,
    "^scripts": paths.scripts,
  },
};

export default resolvers;
