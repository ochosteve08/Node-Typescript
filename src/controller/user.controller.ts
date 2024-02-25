import { Request, Response } from "express";
import { getUsers } from "../service/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};
