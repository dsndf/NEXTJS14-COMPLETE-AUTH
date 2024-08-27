"use server";

import { userCollection } from "@/models/User";
import { connectDatabase } from "@/db/connectDb";
import { verifyJWT } from "../jwt";
import { ErrorHandler } from "@/utils/errorHandler";

type EmailVerificationReturnType = "verified" | "already verified";

type RegisterUserParam = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export const registerUser = async (user: RegisterUserParam) => {
  await connectDatabase();
  await userCollection.create(user);
};

export const emailVerification = async (
  token: string
): Promise<EmailVerificationReturnType> => {
  const userId = verifyJWT(token);
  if (!userId) throw new ErrorHandler("Invalid token", 400);
  const user = await userCollection.findById(userId);
  if (!user) throw new ErrorHandler("Invalid token", 400);
  if (user.emailVerified) return "already verified";
  user.emailVerified = new Date();
  await user.save();
  return "verified";
};
