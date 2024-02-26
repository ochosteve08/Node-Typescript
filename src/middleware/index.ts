import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../service/user.service";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    console.log("userId:", user_id);
    const currentUserId = get(req, "identity._id") as unknown as string;
    console.log("isOwner:", currentUserId.toString());
    if (!currentUserId) {
      return res.status(403).json("forbidden");
    }
    if (user_id !== currentUserId.toString()) {
      return res.status(403).json("forbidden");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["steve-auth"];

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
