import { JWT_SECRET } from "@/config/settings";
import jwt, { JwtPayload } from "jsonwebtoken";
type SignJWT = (userId: string) => string;
type VerifyJWT = (token: string) => string | null;

type JWTOptions = {
  expiresIn: "1d" | "10h" | "60";
};

const jwtOptions: JWTOptions = {
  expiresIn: "1d",
};

export const signJWT: SignJWT = (userId) => {
  console.log({ secret: process.env.JWT_TOKEN_SECRET });
  const token = jwt.sign({ userId }, JWT_SECRET, jwtOptions);
  return token;
};
export const verifyJWT: VerifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded?.userId) return null;
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
