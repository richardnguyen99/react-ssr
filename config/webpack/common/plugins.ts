/**
 * Define which plugins are used in Webpack
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import CaseSensitivePathsWebpackPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

import { envGetter } from "^config";

export const commonPlugins: webpack.Plugin[] = [
  new CaseSensitivePathsWebpackPlugin(),
  new MiniCSSExtractPlugin({
    filename:
      process.env.NODE_END === "development"
        ? "[name].css"
        : "[name].[contenthash].css",
    chunkFilename:
      process.env.NODE_END === "development"
        ? "[id].css"
        : "[id].[contenthash].css",
  }),
];

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
