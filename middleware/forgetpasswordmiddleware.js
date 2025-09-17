import sendResponse from "../utility/response.js";
import jwt from "jsonwebtoken"
import enviormentConfig from "../configs/enviorment.js";

export const checkRequestForForgetPassword = (req, res, next) => {
     
  try {
    const authHeader = req.headers.authorization;
     console.log("this is auth header",authHeader)
    if (!authHeader?.startsWith("Bearer ")) {
      return sendResponse(res, 401, false, null, null, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, enviormentConfig.jwtSecretKey); // ✅ verifies exp
      console.log("this is decoded value",decoded);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendResponse(res, 401, false, null, null, "Link expired, please request again");
    }
    return sendResponse(res, 401, false, null, null, "Invalid token");
  }
};
