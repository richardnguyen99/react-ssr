/**
 * Path configurations for serving the app conveniently
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import path from "path";
import fs from "fs";

const appDir = fs.realpathSync(process.cwd());
const resolveDir = (relativePath: string) => path.resolve(appDir, relativePath);

const paths = {
  template: resolveDir("config/template.html"),
  clientBuild: resolveDir("dist/client"),
  serverBuild: resolveDir("dist/server"),
  dotenv: resolveDir(".env"),
  source: resolveDir("src"),
  clientSrc: resolveDir("src/client"),
  serverSrc: resolveDir("src/server"),
  commonSrc: resolveDir("src/common"),
  config: resolveDir("config"),
  scripts: resolveDir("scripts"),
  types: resolveDir("node_modules/@types"),
  publicPath: "/statics/",
};

export default paths;
