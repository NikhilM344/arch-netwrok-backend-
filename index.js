import express from "express";
import cors from "cors";
import enviormentConfig from "./configs/enviorment.js";
import connectDb from "./configs/dbconfig.js";
import userRegistration from "./router/auth/userauth.js";
import vendorRegistration from "./router/auth/vendorauth.js";

const app = express();
connectDb();
app.use(cors({
  origin: ['http://buildquery.com', 'http://www.buildquery.com','http://localhost:8080'],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));

app.get("/", (req, res) => {
  res.json({ message: "Build Query API is live 🚀" });
});

app.use("/userauth", userRegistration);
app.use("/auth", vendorRegistration);
app.listen(enviormentConfig.port, () => {
  console.log(`server is running on port ${enviormentConfig.port}`);
});
