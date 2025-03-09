import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_JWT_SECRET } from ".";

export const getJWTTokens = (payload: string | object) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: "1d" });

  return { accessToken, refreshToken };
};
