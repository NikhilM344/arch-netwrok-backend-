import sendResponse from "../utility/response.js";
import { jwtDecode } from "jwt-decode";
import enviormentConfig from "../configs/enviorment.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authoraization = req.headers.authorization;
    if (!authoraization) {
      sendResponse(res, 401, false, null, null, "You Are Not Authoraized");
      return;
    }
    const removedBearerToken = authoraization.split("Bearer")[1];
    const decode = jwtDecode(removedBearerToken, enviormentConfig.jwtSecretKey);
    if (decode.role === "professional") {
      const finalInfoAddRequest = {};
      finalInfoAddRequest.role = decode.role;
      finalInfoAddRequest.id = decode.id;
      req.userInfo = finalInfoAddRequest;
      next();
    } else {
      const finalInfoAddRequest = {};
      finalInfoAddRequest.role = decode.role;
      finalInfoAddRequest.id = decode.id;
      req.userInfo = finalInfoAddRequest;
      next();
    }
  } catch (error) {
    console.log("error occur in require middleware", error);
  }
};
