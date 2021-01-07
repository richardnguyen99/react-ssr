/**
 * Resolver to execute queries on User
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IResolvers } from "apollo-server";

import User from "../entities/User";
import {
  LoginPayload,
  RegisterPayload,
  UserArgs,
  LoginArgs,
  RegisterArgs,
  SchemaContext,
} from "@server/interfaces";
import { UserLoginPayload, UserPayload } from "@common/generated/graphql";
import { getUserWithToken } from "@server/utils";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "@server/utils/token";

const UserResolver: IResolvers = {
  Query: {
    user: async (_parents, args: UserArgs, context): Promise<UserPayload> => {
      const { username } = args;

      const userEndpoint = await User.findOne({ where: { username } });

      if (userEndpoint) {
        try {
          const token: string = context.req.headers.authorization || "";

          const user = await getUserWithToken(token);

          if (user) {
            const { username, isAdmin } = user;

            if (isAdmin) {
              return {
                message: "fetched for admins",
                success: true,
                data: {
                  username: userEndpoint.username,
                  email: userEndpoint.email,
                  _id: userEndpoint._id.toHexString(),
                  password: userEndpoint.password,
                  created: userEndpoint.created,
                  modified: userEndpoint.modified,
                  firstname: userEndpoint.firstname,
                  lastname: userEndpoint.lastname,
                  isActive: userEndpoint.isActive,
                  isAdmin: userEndpoint.isAdmin,
                },
              };
            }

            if (username === userEndpoint.username) {
              return {
                message: "fetched for user",
                success: true,
                data: {
                  _id: user._id.toHexString(),
                  username,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: user.password,
                  created: user.created,
                  modified: user.modified,
                  isActive: user.isActive,
                  isAdmin: user.isAdmin,
                },
              };
            }
          }

          return {
            message: "fetched for viewers",
            success: true,
            data: {
              username: userEndpoint.username,
              email: userEndpoint.email,
              _id: userEndpoint._id.toHexString(),
              password: userEndpoint.password,
              created: userEndpoint.created,
              modified: userEndpoint.modified,
              firstname: userEndpoint.firstname,
              lastname: userEndpoint.lastname,
              isActive: userEndpoint.isActive,
              isAdmin: userEndpoint.isAdmin,
            },
          };
        } catch (e) {
          throw new Error(e);
        }
      }

      return {
        message: "user doesn't exist",
        success: false,
        data: null,
      };
    },
    dummy: (): string => "Dummy GraphQL Testing",
    getUsers: async (): Promise<User[]> => {
      const user = await User.find();

      return user;
    },
  },
  Mutation: {
    login: async (
      _,
      args: LoginArgs,
      { res }: SchemaContext
    ): Promise<UserLoginPayload> => {
      const { username, password } = args;

      const user = await User.findOne({
        where: { username },
      });

      if (user) {
        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
          return {
            success: false,
            message: "not found",
            token: "",
          };
        }

        try {
          sendRefreshToken(res, createRefreshToken(user));

          return {
            success: true,
            message: "logged in",
            data: {
              username: user.username,
              email: user.email,
              _id: user._id.toHexString(),
              password: user.password,
              created: user.created,
              modified: user.modified,
              firstname: user.firstname,
              lastname: user.lastname,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
            },
            token: createAccessToken(user),
          };
        } catch (e) {
          throw new Error(e);
        }
      }

      return {
        success: false,
        message: "not found",
        token: "",
      };
    },

    register: async (_, args: RegisterArgs): Promise<RegisterPayload> => {
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
          username: user.username,
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default UserResolver;
