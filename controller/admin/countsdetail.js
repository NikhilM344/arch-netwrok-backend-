import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js"
import { userSignUpModle } from "../../models/auth/usersignupmodle.js"
import sendResponse from "../../utility/response.js";

export const countDetail = async (req, res) => {
 try {
    const professionalCount = await vendorSignUpModel.countDocuments({});
    const userCount = await userSignUpModle.countDocuments({});
    const totalCount = professionalCount + userCount;
     const counts = [
        {professionalCount: professionalCount},
        {userCount: userCount},
        {totalCount: totalCount}
     ]
   return  sendResponse(res,200,true,counts,null,"Counts fetched successfully");
 } catch (error) {
    console.log('error',error)
 }
}