import bcrypt from "bcryptjs";

import { adminLoginModel } from "../../models/admin/auth/adminloginmodel.js";
import enviormentConfig from "../../configs/enviorment.js";
import e from "express";
const username = enviormentConfig.adminEmail;
const rawPassword = enviormentConfig.adminPassword;
 console.log("check email",enviormentConfig.adminEmail);
  console.log("check password",enviormentConfig.adminPassword);


export async function createAdmin() {
  try {
    const existingAdmin = await adminLoginModel.findOne({ username });
     console.log("existing admin",existingAdmin);
    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Skipping creation.");
    } else {
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      const admin = new adminLoginModel({
        username,
        password: hashedPassword,
      });

      await admin.save();
      console.log("✅ Admin created successfully");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔹 DB connection closed");
    process.exit();
  }
}
