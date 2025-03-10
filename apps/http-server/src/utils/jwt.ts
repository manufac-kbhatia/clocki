import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_JWT_SECRET } from ".";

export const getJWTTokens = (payload: string | object) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: "20s" });

  return { accessToken, refreshToken };
};

export const getAccessToken = (payload: string | object) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
  return accessToken;
};

export const getRefressToken = (payload: string | object) => {
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: "30s" });
  return refreshToken;
};
