import mongoose from "mongoose";
import enviormentConfig from "./enviorment.js";
import { createAdmin } from "../utility/admin/createadmin.js";
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(enviormentConfig.dbConnectionUri, {
      dbName: "arch-network-hub",
    });
    if (connect) console.log("db connection successfully");
    if (enviormentConfig.adminAutoCreate === "true") {
      await createAdmin();
    }
  } catch (error) {
    console.log("error while occur when connect the db", error);
  }
};

export default connectDb;
