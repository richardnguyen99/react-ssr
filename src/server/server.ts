/**
 * Express server application file
 *
 * @author Richard Nguyen <richard.0616@gmai.com>
 */
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import ManifestExpress from "./middleware/manifest";
import SSR from "./middleware/ssr";
import paths from "^config/paths";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  paths.publicPath,
  express.static(path.join(paths.clientBuild, paths.publicPath))
);

app.use(
  ManifestExpress({
    path: `${path.join(paths.clientBuild, paths.publicPath, "manifest.json")}`,
    cache: true,
  })
);

app.use(SSR());

app.listen(3000, () => {
  console.log("`✅✅✅ Server is running at http://localhost:3000 ✅✅✅");
});
