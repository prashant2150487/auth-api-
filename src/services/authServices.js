import User from "../models/User.js";
import { generateOTP } from "../utils/helper.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import Role from "../models/Role.js";

export const signUpService = async (name, email, password) => {
  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const saltRound = 12;

  const hashedPassword = await bcrypt.hash(password, saltRound);

  // Find or create default "user" role
  let defaultRole = await Role.findOne({ where: { name: "user" } });
  if (!defaultRole) {
    // Create default role if it doesn't exist
    defaultRole = await Role.create({
      name: "user",
      description: "Default user role",
    });
  }
  const otp = generateOTP();
  console.log(otp,"otp");
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: defaultRole.id, 
    isVerified: false,
    emailVerificationOTP: otp,
    emailVerificationOTPExpiresAt: otpExpiresAt,
  });
  await sendEmail(
    email,
    "Email Verification",
    `Your verification OTP is: ${otp}`
  );

  // const token = generateToken({
  //   id: user.id,
  //   email: user.email,
  //   name: user.name,
  // });
  return {
    message:
      "Signup initiated. Please verify your email with otp send to your email",
    user
  };
};
