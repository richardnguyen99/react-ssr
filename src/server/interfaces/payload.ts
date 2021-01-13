/**
 * Payload interface
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { ObjectID } from "typeorm";

import User from "@server/entities/User";

export interface BasicPayload {
  message: string;
  success: boolean;
}

export interface LoginPayload extends BasicPayload {
  username?: string;
  token?: string;
}

export interface RegisterPayload extends BasicPayload {
  username?: string;
}

export interface Data {
  iat: number;
  exp: number;
}

export interface LoginData extends Data {
  data: {
    username: string;
    _id: ObjectID;
  };
}

type UserDataForAdmin = User;

type UserDataForUser = Pick<
  User,
  | "firstname"
  | "lastname"
  | "email"
  | "password"
  | "username"
  | "created"
  | "modified"
>;

type UserDataForViewer = Pick<User, "username" | "firstname" | "lastname">;

export interface UserPayload {
  message: string;
  success: boolean;
  data: UserDataForAdmin | UserDataForUser | UserDataForViewer | null;
}
