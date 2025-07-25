import { adminLoginModel } from "../../models/admin/auth/adminloginmodel.js";
import generateJWT from "../../utility/genratejwt.js";
import sendResponse from "../../utility/response.js";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
   try{
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Username and password are required",
        "Login Error"
      );
    }

    // Check if admin exists
    const admin = await adminLoginModel.findOne({ username });
    if (!admin) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "Admin not found",
        "Login Error"
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return sendResponse(
        res,
        401,
        false,
        null,
        "Invalid password",
        "Login Error"
      );
    }

    const payload = {
      id: admin._id,
      username: admin.username,
    };

    // Generate JWT token (assuming you have a function for this)
    const token = generateJWT(payload);

    return sendResponse(
      res,
      200,
      true,
      { token, username: admin.username },
      null,
      "Admin Login successful"
    );
   }catch(error){
    console.log("Error in adminLogin:", error);
   }
}