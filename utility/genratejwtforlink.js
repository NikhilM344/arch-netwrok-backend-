import jwt from "jsonwebtoken";
import enviormentConfig from "../configs/enviorment.js";

const generateJWTForLink = (payload, expiresIn= "15m" ) => {
  return jwt.sign(payload, enviormentConfig.jwtSecretKey, { expiresIn });
};

export default generateJWTForLink;
