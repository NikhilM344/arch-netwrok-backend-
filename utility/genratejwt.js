import jwt from "jsonwebtoken";
import enviormentConfig from "../configs/enviorment.js";

const generateJWT = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, enviormentConfig.jwtSecretKey, { expiresIn });
};

export default generateJWT;
