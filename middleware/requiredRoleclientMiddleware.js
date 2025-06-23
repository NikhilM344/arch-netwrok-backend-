import sendResponse from "../utility/response.js";
import { jwtDecode } from "jwt-decode";
import enviormentConfig from "../configs/enviorment.js";

export const requireRoleClient = async (req, res, next) => {
  try {
    const authoraization = req.headers.authorization;
     if(!authoraization){
      sendResponse(res,401,false,null,null,"You Are Not Authoraized");
      return
     };
    const removedBearerToken = authoraization.split("Bearer")[1];
      const decode =  jwtDecode(removedBearerToken,enviormentConfig.jwtSecretKey);
        console.log("this is decoded",decode);
     if(decode.role === "user"){
       req.userId=decode.id
      next()
     }else{
     sendResponse(res,403,false,null,null,"You have Not Permitted For Access This Role")
     }
  } catch (error) {
    console.log("error occur in require middleware", error);
  }
};
