import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../service/user.service";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies("steve-auth");
    if (!sessionToken) {
      return res.status(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403);
    }
    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.log(error);
  }
};
