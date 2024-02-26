import { Request, Response } from "express";
import { userRegistration, userLogin } from "../service/user.service";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json("all fields are required");
    }

    const user = await userRegistration(username, email, password);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json("user registration failed");
    }
  } catch (err) {
    console.error("error message", err);
    return res.sendStatus(400);
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(req.url);
    console.log(req.method);
    if (!email || !password) {
      return res.status(400).json("all fields are required");
    }

    const user = await userLogin(email, password);

    res.cookie("steve-auth", user.authentication?.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
