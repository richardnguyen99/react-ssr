/**
 * Function to combine multiple GraphQL files and
 * Resolvers into one single file
 *
 * @see https://www.apollographql.com/docs/apollo-server/features/schema-stitching/
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

import UserSchema from "../graphql/user.graphql";
import UserResolver from "@server/resolvers/User";

const userSchema = makeExecutableSchema({
  typeDefs: UserSchema,
  resolvers: UserResolver,
});

const schema = mergeSchemas({
  schemas: [userSchema],
});

export default schema;
