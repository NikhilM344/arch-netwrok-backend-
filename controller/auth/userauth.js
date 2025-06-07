import sendResponse from "../../utility/response.js";
import { userSignUpModle } from "../../models/auth/usersignupmodle.js";
import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";
import bcrypt from "bcryptjs";
import generateJWT from "../../utility/genratejwt.js";


export const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role) {
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
      return sendResponse(res, 400, false, null, "Email, Password and Role are required", "Validation Error");
    }

    let user;
    let isVendor = false;

    if (role === "user") {
      user = await userSignUpModle.findOne({ email });
    } else if (role === "professional") {
      user = await vendorSignUpModel.findOne({ email });
      isVendor = true;
    } else {
      return sendResponse(res, 400, false, null, "Invalid role", "Role Error");
    }

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found", "No Account");
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, null, "Invalid credentials", "Login Failed");
    }

    const tokenPayload = { id: user._id, email: user.email, role };
    const token = generateJWT(tokenPayload);

    const responseData = {
      token,
      role,
      email: user.email,
      name: isVendor ? user.fullName : `${user.firstName} ${user.lastName}`,
    };

    return sendResponse(res, 200, true, responseData, null, "Login successful");
  } catch (error) {
    console.error("Login Error:", error);
    return sendResponse(res, 500, false, null, "Something went wrong", "Server Error");
  }
};
