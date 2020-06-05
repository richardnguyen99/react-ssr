/**
 * Define which plugins are used in Webpack
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";

import { envGetter } from "^config";

export const clientPlugins: webpack.Plugin[] = [
  new ManifestPlugin({
    fileName: "manifest.json",
  }),
  new webpack.DefinePlugin(envGetter().webpackEnvPlugin),
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true",
  }),
].filter(Boolean);

export const serverPlugins: webpack.Plugin[] = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false",
  }),
].filter(Boolean);
