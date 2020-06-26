import { Request, Response } from "express";

import {
  BasicPayload,
  LoginData,
  RegisterPayload,
  LoginPayload,
  Data,
  UserPayload,
} from "./payload";
import { LoginArgs, RegisterArgs, UserArgs } from "./resolvers";

interface SchemaContext {
  req: Request;
  res: Response;
}

export {
  BasicPayload,
  LoginData,
  RegisterPayload,
  Data,
  LoginPayload,
  UserPayload,
  LoginArgs,
  RegisterArgs,
  UserArgs,
  SchemaContext,
};
