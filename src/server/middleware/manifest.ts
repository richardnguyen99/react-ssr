/**
 * Middleware enables Express to load manifest's sources
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction, RequestHandler } from "express";

import paths from "^config/paths";

interface ManifestExpressOptions {
  path?: string;
  cache?: boolean;
}

interface Manifest {
  [k: string]: string;
}

const options: ManifestExpressOptions = {};
let manifest: Manifest = {};

const loadManifest = () => {
  if (Object.keys(manifest).length !== 0 && options.cache) return manifest;

  if (options.path !== undefined) {
    const newManifest = JSON.parse(fs.readFileSync(options.path, "utf8"));
    return newManifest;
  } else {
    throw new Error("Asset Manifest could not be loaded.");
  }
};

const assetPath = (source: string): string => {
  manifest = loadManifest();

  if (manifest[source]) return manifest[source];
  else return "";
};

/**
 * Returns an Express middleware function that modifies
 * Express response to store manifest sources
 *
 * @param {ManifestExpressOptions} opts Options to use this plugin
 * @returns {RequestHandler} Function to store manifest sources
 */
const ManifestExpress = (opts: ManifestExpressOptions): RequestHandler => {
  const defaultOpts: ManifestExpressOptions = {
    path: path.join(paths.clientBuild, paths.publicPath),
    cache: true,
  };

  Object.assign(options, defaultOpts, opts);

  return (_req: Request, res: Response, next: NextFunction): void => {
    res.locals.assetPath = assetPath;

    next();
  };
};

export default ManifestExpress;
