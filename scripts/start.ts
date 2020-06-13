/**
 * Starting script used to run application in development mode.
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import webpack from "webpack";
import nodemon from "nodemon";
import express, { Request, Response, NextFunction } from "express";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";

import { getWebpackConfig } from "^config/webpack";
import {
  WEBPACK_PORT,
  DEVSERVER_HOST,
  logMessage,
  waitCompilationDone,
} from "^config";
import paths from "^config/paths";

const webpackConfig = getWebpackConfig(process.env.NODE_ENV || "development");

const app = express();

const start = async () => {
  let publicPath: string;
  const [clientCfg, serverCfg] = webpackConfig;

  // @ts-ignore
  clientCfg.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    // @ts-ignore
    ...clientCfg.entry.bundle,
  ];

  if (clientCfg.output !== undefined) {
    clientCfg.output.hotUpdateMainFilename = "updates/[hash].hot-update.json";
    clientCfg.output.hotUpdateChunkFilename =
      "updates/[id].[hash].hot-update.js";

    // @ts-ignore
    publicPath = clientCfg.output.publicPath;

    clientCfg.output.publicPath = [
      `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
      publicPath,
    ]
      .join("/")
      .replace(/([^:+])\/+/g, "$1/");
    if (serverCfg.output !== undefined) {
      serverCfg.output.publicPath = [
        `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
        publicPath,
      ]
        .join("/")
        .replace(/([^:+])\/+/g, "$1/");
    }
  }

  const multiCompiler = webpack([clientCfg, serverCfg]);

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );

  // Use this to ensure Typescript doesn't complain
  // about possibly undefined objects
  if (clientCompiler && serverCompiler) {
    const serverAfterDone = waitCompilationDone("server", serverCompiler);
    const clientAfterDone = waitCompilationDone("client", clientCompiler);

    const watchOptions: webpack.Options.WatchOptions = {
      ignored: /node_modules/,
    };

    app.use((_req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      return next();
    });

    app.use(
      WebpackDevMiddleware(clientCompiler, {
        // @ts-ignore
        publicPath: clientCfg.output.publicPath,
        stats: clientCfg.stats,
        watchOptions,
      })
    );

    app.use(WebpackHotMiddleware(clientCompiler));

    app.use("/statics", express.static(paths.clientBuild));

    app.listen(WEBPACK_PORT);

    serverCompiler.watch(watchOptions, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(serverCfg.stats));
        return;
      }

      if (error) {
        logMessage(error, "error");
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        const errors = info.errors[0].split("\n");
        logMessage(errors[0], "error");
        logMessage(errors[1], "error");
        logMessage(errors[2], "error");
      }
    });

    try {
      await serverAfterDone;
      await clientAfterDone;
    } catch (e) {
      logMessage(e, "red");
    }

    const script = nodemon({
      script: `${paths.serverBuild}/server.js`,
      ignore: [
        "src",
        "scripts",
        "config",
        "./*.*",
        "dist/client",
        "**/locales",
        "**/tmp",
      ],
      delay: 200,
    });

    script.on("restart", () => {
      logMessage("Server side app has been restarted.", "warning");
    });

    script.on("quit", () => {
      console.log("Process ended");
      process.exit();
    });

    script.on("error", () => {
      logMessage("An error occured. Exiting", "error");
      process.exit(1);
    });
  }
};

start();
