import jwt from "jsonwebtoken";
import AuthenticationError from "@/backend/errors/AuthenticationError";

export const generateToken = (userId: string) => {
  return jwt.sign(userId, process.env.JWT_SECRET as string);
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as string;
  } catch (error: any) {
    throw new AuthenticationError(error.message);
  }
};
