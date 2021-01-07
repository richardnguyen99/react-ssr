/**
 * Utilities to work with JWT
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import jwt from "jsonwebtoken";
import { Response } from "express";

import User from "@server/entities/User";
import { LoginData } from "@server/interfaces/payload";

/**
 * Gets token, verifies it and returns needed data
 *
 * @param token A JWT that contains information about user (Authentication token)
 * @return User or undefined based on the given token
 */
export const getUserWithToken = async (
  token: string
): Promise<User | undefined> => {
  if (token) {
    if (!token.includes("Bearer")) {
      return undefined;
    }

    const { data } = jwt.verify(token.split(" ")[1], "react-ssr") as LoginData;

    const user = await User.findOne(data._id);

    return user;
  }

  return undefined;
};

/**
 * Add cookie value to Response when a request was sent.
 *
 * @param {Response} res - Express Response
 * @param token - Token generated from other functions.
 * @returns {void}
 */
export const sendRefreshToken = (res: Response, token: string): void => {
  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/api/refresh_token",
  });
};

export const createRefreshToken = (user: User): string => {
  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 30,
      data: {
        username: user.username,
        _id: user._id,
      },
    },
    "react-ssr",
    {
      expiresIn: "14d",
    }
  );
};

export const createAccessToken = (user: User): string => {
  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 30,
      data: {
        username: user.username,
        _id: user._id,
      },
    },
    "react-ssr",
    {
      expiresIn: "1h",
    }
  );
};
