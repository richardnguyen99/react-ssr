/**
 * Tools, functions and variables to use globally
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import chalk from "chalk";
import webpack from "webpack";
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

export const envGetter = (): Record<string, unknown> => {
  type AppEnvironmentType = {
    [k: string]: string | number;
  };

  const appEnv: AppEnvironmentType = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "http://localhost",
  };

  const webpackEnvPlugin = {
    "process.env": Object.keys(appEnv).reduce<Record<string, string>>(
      (env, key) => {
        env[key] = JSON.stringify(appEnv[key]);
        return env;
      },
      {}
    ),
  };

  return { appEnv, webpackEnvPlugin };
};

export const WEBPACK_PORT = process.env.WEBPACK_PORT || 3500;

export const DEVSERVER_HOST = process.env.DEVSERVER_HOST || "http://localhost";
