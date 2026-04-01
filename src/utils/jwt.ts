import fs from "fs";
import jwt from "jsonwebtoken";
import "dotenv/config.js"

let APP_ID = process.env.APP_ID;
if(!APP_ID){
  throw new Error("APP is missing!")
}
let pK = process.env.PRIVATE_KEY;
if(!pK){
  throw new Error("Jwt server error!")
}
let finalPrivateKey = pK.split("\\n").join("\n").trim();
export const jwtToken = async () => {
  const privateKey = finalPrivateKey;
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: APP_ID,
    iat: now,
    exp: now + 9 * 60,
  };
  const signOptions = {
    algorithm: "RS256",
  };
  // @ts-ignore
  const token = await jwt.sign(payload, privateKey, signOptions);
  return token;
};
