import { Request, Response } from "express";
import {
  getUsers,
  deleteUser,
  updateUserById,
  getUserById,
} from "../service/user.service";

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

    const user = await deleteUser(user_id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

