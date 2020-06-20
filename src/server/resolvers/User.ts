/**
 * Resolver to execute queries on User
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import bcrypt from "bcrypt";
import { IResolvers } from "apollo-server";

import User from "../entities/User";
import { Payload } from "@server/interfaces/payload";

interface RegisterArgs {
  username: string;
  email: string;
  password: string;

  lastname?: string;
  firstname?: string;
}

const UserResolver: IResolvers = {
  Query: {
    dummy: (): string => "Dummy GraphQL Testing",
    getUsers: async (): Promise<User[]> => {
      const user = await User.find();

      return user;
    },
  },
  Mutation: {
    register: async (_, args: RegisterArgs): Promise<Payload> => {
      const { username, email, password, lastname, firstname } = args;

      const doesUserExists = await User.findOne({
        // Check if username or email exists
        where: { email } || { username },
      });

      if (doesUserExists) {
        return {
          success: false,
          message: "duplicate",
        };
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const created = new Date().toLocaleString();
        const modified = created;

        const user = await User.create({
          email,
          username,
          password: hashedPassword,
          firstname: firstname || username,
          lastname: lastname || username,
          created,
          modified,
          isActive: false,
          isAdmin: false,
        }).save();

        return {
          success: true,
          message: "registered",
          payload: {
            id: user.id,
            username: user.username,
          },
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default UserResolver;
