import { userModel } from "../models/user.model";
import { authentication, random } from "../utils/encrypt";

export const getUsers = () => userModel.find();

export const getUserByEmail = (email: string) => userModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => userModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());

export const deleteUser = (user_id: string) =>
  userModel.findByIdAndDelete({ _id: user_id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values, { new: true });

export const userRegistration = async (
  username: string,
  email: string,
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

export const userLogin = async (email: string, password: string) => {
  const existingUser = await getUserByEmail(email).select(
    "+authentication.salt +authentication.password"
  );
  if (!existingUser) {
    throw new Error("user not found");
  }
  if (!existingUser?.authentication?.salt) {
    throw new Error("User authentication data is missing.");
  }

  const authenticateHash = authentication(
    existingUser.authentication.salt,
    password
  );
  if (existingUser.authentication.password !== authenticateHash) {
    throw new Error("incorrect password");
  }
  const salt = random();
  existingUser.authentication.sessionToken = authentication(
    salt,
    existingUser._id.toString()
  );
  await existingUser.save();
  return existingUser;
};
