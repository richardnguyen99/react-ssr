/**
 * Tools, functions and variables to use globally
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import chalk from "chalk";
import webpack from "webpack";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

/**
 * Check if run the application on client-side
 *
 * @returns {boolean} Boolean
 */
export const isForClient = (): boolean => process.argv.includes("--client");

/**
 * Utility function display logs beautifully
 *
 * @param {unknown} message Message needed to be displayed
 * @param {string} level Determine which color should be used
 */
export const logMessage = (message: unknown, level = "info"): void => {
  const color =
    level === "error"
      ? "red"
      : level === "warning"
      ? "yellow"
      : level === "info"
      ? "blue"
      : "white";
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

/**
 * Monitor Webpack compilation process and handle errors manually
 *
 * @param { string } name Name of the current compiler
 * @param { webpack.Compiler } compiler Webpack compiler
 * @returns { Promise<void> } Returns a void Promise to wait the compilation is done.
 */
export const waitCompilationDone = (
  name: string,
  compiler: webpack.Compiler
): Promise<void> => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats: webpack.Stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
};

/**
 * Returns config object of environment variables
 */
export const envGetter = (): Record<
  string,
  Record<string, string | number>
> => {
  type AppEnvironmentType = Record<string, string | number>;

  const appEnv: AppEnvironmentType = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "http://localhost",
  };

  const webpackEnvPlugin = ({
    "process.env": Object.keys(appEnv).reduce<Record<string, string | number>>(
      (env, key) => {
        env[key] = JSON.stringify(appEnv[key]);
        return env;
      },
      {}
    ),
    // Typescript conversion to bypass Typescript compiler ¯\_(ツ)_/
  } as unknown) as Record<string, string | number>;

  return { appEnv, webpackEnvPlugin };
};

export const getMongoURI = (): string | undefined => {
  if (process.env.NODE_ENV === "development") {
    if (typeof process.env["MONGODB_DEV_URI"] === "undefined") {
      logMessage(
        "No Mongo connection string is set in development environment. Set MONGODB_DEV_URI environment variable."
      );
      process.exit(1);
    } else {
      return process.env["MONGODB_DEV_URI"];
    }
  } else if (process.env.NODE_ENV === "production") {
    if (typeof process.env["MONGODB_PROD_URI"] === "undefined") {
      logMessage(
        "No Mongo connection string is set in production environment. Set MONGODB_PROD_URI environment variable."
      );
      process.exit(1);
    } else {
      return process.env["MONGODB_PROD_URI"];
    }
  } else {
    logMessage(
      `Unknown environment: ${process.env.NODE_ENV}. If still want to run, please set a MongoDB connection for this environment`
    );
    process.exit(1);
  }
};

export const WEBPACK_PORT = process.env.WEBPACK_PORT || 3500;

export const DEVSERVER_HOST = process.env.DEVSERVER_HOST || "http://localhost";
