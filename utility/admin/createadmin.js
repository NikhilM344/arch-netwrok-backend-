import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { adminLoginModel } from "../../models/admin/auth/adminloginmodel.js";
import enviormentConfig from '../../configs/enviorment.js';
const username = enviormentConfig.adminEmail;
const rawPassword = enviormentConfig.adminPassword;

// export async function createAdmin() {
//   try {
//     const existingAdmin = await adminLoginModel.findOne({ username });

//     if (existingAdmin) {
//       console.log("⚠️ Admin already exists. Skipping creation.");
//     } else {
//       const hashedPassword = await bcrypt.hash(rawPassword, 10);

//       const admin = new adminLoginModel({
//         username,
//         password: hashedPassword,
//       });

//       await admin.save();
//       console.log("✅ Admin created successfully");
//     }
//   } catch (error) {
//     console.error("❌ Error creating admin:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

export async function createAdmin() {
  try {
    const existingAdmin = await adminLoginModel.findOne({ username });

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
  }
  // remove mongoose.connection.close();
}
