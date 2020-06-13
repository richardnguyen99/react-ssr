/**
 * Resolver to execute queries on User
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { IResolvers } from "apollo-server";

import User from "../entities/User";

const UserResolver: IResolvers = {
  Query: {
    dummy: (): string => "Dummy GraphQL Testing",
    getUsers: async (): Promise<User[]> => {
      const user = await User.find();

      console.log(user);

      return user;
    },
  },
};

export default UserResolver;
