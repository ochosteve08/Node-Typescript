import { userModel } from "../models/user.model";

export const getUsers = () => userModel.find();

export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionTOken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
// export const createUser = ()=> userModel.create()
                          