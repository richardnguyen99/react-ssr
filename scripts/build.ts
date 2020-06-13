/**
 * Script to build client and server from Webpack in production
 *
 * @author Richard Nguyen <richard.ng0616.com>
 */
import webpack from "webpack";
import rimraf from "rimraf";

import { getWebpackConfig } from "^config/webpack";
import paths from "^config/paths";
import { logMessage, waitCompilationDone } from "^config";

const webpackConfig = getWebpackConfig(process.env.NODE_ENV || "production");

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );

  if (clientCompiler && serverCompiler) {
    const clientAfterDone = waitCompilationDone("client", clientCompiler);
    const serverAfterDone = waitCompilationDone("server", serverCompiler);

    serverCompiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(serverConfig.stats));
        return;
      }
      console.log(logMessage(stats.compilation.errors, "error"));
    });

    clientCompiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
        return;
      }
      console.log(logMessage(stats.compilation.errors, "error"));
    });

    try {
      await clientAfterDone;
      await serverAfterDone;
      // await generateStaticHTML();
      logMessage("Compilation is done", "info");
    } catch (e) {
      logMessage(e, "error");
    }
  }
};

build();
