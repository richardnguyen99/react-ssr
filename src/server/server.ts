/**
 * Express server application file
 *
 * @author Richard Nguyen <richard.0616@gmai.com>
 */
import "reflect-metadata";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";

import { SSR, ManifestExpress } from "@server/middleware";
import rootSchema from "./utils/gqlCombine";
import UserResolver from "./resolvers/User";
import paths from "^config/paths";
import TypeORMConfig from "^config/typeorm";
import { SchemaContext, LoginData } from "@server/interfaces";
import User from "@server/entities/User";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "./utils/token";

(async function () {
  const app = express();

  // Apply express middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath))
  );

  app.use(
    ManifestExpress({
      path: `${path.join(
        paths.clientBuild,
        paths.publicPath,
        "manifest.json"
      )}`,
      cache: true,
    })
  );

  // This must come before SSR middleware.
  const server = new ApolloServer({
    schema: rootSchema,
    resolvers: UserResolver,
    playground:
      process.env.NODE_ENV === "development"
        ? { endpoint: "/api/graphql" }
        : false,
    context: ({ req, res }: SchemaContext): SchemaContext => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.post("/api/refresh_token", async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res.send({
        message: "refresh_token not found",
        success: false,
        data: null,
      });
    }

    try {
      const payload = jwt.verify(token, "react-ssr") as LoginData;

      const user = await User.findOne({
        where: { username: payload.data.username },
      });

      if (!user) {
        return res.send({
          message: "invalid token",
          success: false,
          data: null,
        });
      }

      sendRefreshToken(res, createRefreshToken(user));

      return res.send({
        message: "sent refresh_token",
        success: true,
        data: {
          accessToken: createAccessToken(user),
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  });

  await createConnection(TypeORMConfig);

  app.get("*", SSR());

  app.listen(3000, () => {
    console.log("`✅✅✅ Server is running at  port 3000 ✅✅✅");
  });
})();
