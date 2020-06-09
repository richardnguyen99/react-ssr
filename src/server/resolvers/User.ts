/**
 * Resolver to execute queries on User
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { IResolvers } from "apollo-server";

import User from "../entities/User";

const UserResolver: IResolvers = {
  Query: {
    getAllUser: async (): Promise<User[]> => {
      const user = await User.find();

      return user;
    },
  },
};

export default UserResolver;
