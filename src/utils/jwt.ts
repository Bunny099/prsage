import fs from "fs";
import jwt from "jsonwebtoken";

export const jwtToken = async () => {
  const privateKey = fs.readFileSync("./file/private-key.pem", "utf-8");
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: process.env.APP_ID!,
    iat: now,
    exp: now + 9 * 60,
  };
  const signOptions = {
    algorithm: "RS256",
  };
  //@ts-ignore
  const token = await jwt.sign(payload, privateKey, signOptions);
  return token;
};
