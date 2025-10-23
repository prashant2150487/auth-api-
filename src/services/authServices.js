import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const signUpService = async (name, email, password) => {
  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const saltRound = 12;

  const hashedPassword = await bcrypt.hash(password, saltRound);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });
  console.log(token,"token")
  return {
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    },
    token
  }
};
