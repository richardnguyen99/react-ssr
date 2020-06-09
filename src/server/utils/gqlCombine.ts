/**
 * Function to combine multiple GraphQL files and
 * Resolvers into one single file
 *
 * @see https://www.apollographql.com/docs/apollo-server/features/schema-stitching/
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

import UserSchema from "../graphql/user.gql";
import { addMockFunctionsToSchema } from "apollo-server";

const userSchema = makeExecutableSchema({
  typeDefs: UserSchema,
});

addMockFunctionsToSchema({ schema: userSchema });

const schema = mergeSchemas({
  schemas: [userSchema],
});

export default schema;
