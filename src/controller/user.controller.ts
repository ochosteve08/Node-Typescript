import { Request, Response } from "express";
import { getUsers, deleteUser } from "../service/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    console.log(user_id)
    const user = await deleteUser(user_id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
