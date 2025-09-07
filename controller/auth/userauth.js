import sendResponse from "../../utility/response.js";
import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { vendorSignUpModel } from "../../models/auth/professionalsignupmodel.js";
import bcrypt from "bcryptjs";
import generateJWT from "../../utility/genratejwt.js";

// modified with new
export const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role,mobileNumber } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role ||!mobileNumber) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "All fields are required",
        "User Credential Error"
      );
    }

    // Check if user already exists
    const existingUser = await userSignUpModle.findOne({ email });
    if (existingUser) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You are already registered. Please login.",
        "Already in DB"
      );
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create new user with hashed password
    const newUser = new userSignUpModle({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return sendResponse(
      res,
      201,
      true,
      { email: newUser.email, role: newUser.role },
      null,
      "User created successfully"
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, 400, false, null, errors[0], "Validation failed");
    } else if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Email already exists",
        "Duplicate Email"
      );
    } else {
      return sendResponse(
        res,
        500,
        false,
        null,
        "Internal Server Error",
        "Unexpected Error"
      );
    }
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Email, Password and Role are required",
        "Validation Error"
      );
    }

    let user;
    let isVendor = false;

    if (role === "user") {
      user = await userSignUpModle.findOne({ email });
    } else if (role === "professional") {
      user = await vendorSignUpModel.findOne({ representativeEmail: email });
      isVendor = true;

      // ✅ Direct check on root field
      if (user && user.isVerifiedByAdmin === false) {
        return sendResponse(
          res,
          403,
          false,
          null,
          null,
          "Your account has not been verified by the admin yet. Please wait until the verification is complete to log in.",
          "Verification Pending"
        );
      }
    } else {
      return sendResponse(res, 400, false, null, "Invalid role", "Role Error");
    }

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found", "No matching account exists in our records");
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return sendResponse(
        res,
        401,
        false,
        null,
        "Invalid credentials",
        "Authentication failed. Invalid username or password."
      );
    }

    const tokenPayload = {
      id: user._id,
      email: isVendor ? user.representativeEmail : user.email,
      role,
    };
    const token = generateJWT(tokenPayload);

    const responseData = {
      id: user._id,
      token,
      role,
      email: isVendor ? user.representativeEmail : user.email,
      name: isVendor
        ? user.representativeName
        : `${user.firstName} ${user.lastName}`,
    };

    return sendResponse(res, 200, true, responseData, null, "Login successful");
  } catch (error) {
    console.error("Login Error:", error);
    return sendResponse(
      res,
      500,
      false,
      null,
      "Something went wrong",
      "Server Error"
    );
  }
};

