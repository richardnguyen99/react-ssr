/**
 * Express server application file
 *
 * @author Richard Nguyen <richard.0616@gmai.com>
 */
import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";

import ManifestExpress from "./middleware/manifest";
import SSR from "./middleware/ssr";
import rootSchema from "./utils/gqlCombine";
import UserResolver from "./resolvers/User";
import paths from "^config/paths";
import TypeORMConfig from "^config/typeorm";

interface SchemaContext {
  req: Request;
  res: Response;
}

const app = express();

// Apply express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
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

const server = new ApolloServer({
  schema: rootSchema,
  resolvers: UserResolver,
  playground: process.env.NODE_ENV === "development",
  context: ({ req, res }: SchemaContext): SchemaContext => ({ req, res }),
});

server.applyMiddleware({ app, cors: true });

createConnection(TypeORMConfig);

app.listen(3000, () => {
  console.log("`✅✅✅ Server is running at http://localhost:3000 ✅✅✅");
});
