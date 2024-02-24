import { Request, Response } from "express";
import { userRegistration } from "../service/user.service";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json("all fields are required");
    }

    const user = await userRegistration(email, password, username);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
  }
};
