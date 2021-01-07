/**
 * Defines TypeORM configurations
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import path from "path";
import { ConnectionOptions } from "typeorm";

import { getMongoURI } from "^config";
import User from "@server/entities/User";

const devConfig: ConnectionOptions = {
  name: "default",
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "react-ssr",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [__dirname + "src/**/migrations/*.ts"],
  subscribers: [__dirname + "src/**/subscribers/*.ts"],
};

const prodConfig: ConnectionOptions = {
  name: "default",
  type: "mongodb",
  url: getMongoURI(),
  database: "react-ssr",
  synchronize: true,
  entities: [User],
  migrations: [__dirname + "src/**/migrations/*.ts"],
  subscribers: [__dirname + "src/**/subscribers/*.ts"],
};

const TypeORMConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default TypeORMConfig;
