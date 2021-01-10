/**
 * Defines TypeORM configurations
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { ConnectionOptions } from "typeorm";

import { getMongoURI } from "^config";

const devConfig: ConnectionOptions = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "react-ssr",
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const prodConfig: ConnectionOptions = {
  type: "mongodb",
  url: getMongoURI(),
  database: "react-ssr",
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const TypeORMConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default TypeORMConfig;
