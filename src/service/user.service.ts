import { userModel } from "../models/user.model";
import { authentication, random } from "../utils/encrypt";

export const getUsers = () => userModel.find();

export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
export const deleteUser = (id: string) => userModel.findByIdAndDelete(id);

export const updateUser = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values, { new: true });

export const userRegistration = async (
  email: string,
  username: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("user already exists");
  }
  const salt = random();
  const user = await createUser({
    email,
    username,
    authentication: {
      salt,
      password: authentication(salt, password),
    },
  });
  return user;
};
