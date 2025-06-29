import express from "express";
import cors from "cors";
import enviormentConfig from "./configs/enviorment.js";
import connectDb from "./configs/dbconfig.js";
import userRegistration from "./router/auth/userauth.js";
import vendorRegistration from "./router/auth/vendorauth.js";
import professionList from './router/list/professionalListRoute.js'
import clientRequest from './router/requests/clientRequestsrouter.js'
import userprofile from './router/profile/profileRouter.js'
import professionalPortfolio from './router/professional/portfolio/createportfolio.js'
import professionalProject from './router/professional/project/projectroute.js'

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

app.use('/uploads', express.static('uploads'));
app.use("/userauth", userRegistration);
app.use("/auth", vendorRegistration);
app.use("/professional", professionList);
app.use("/request",clientRequest);
app.use("/user",userprofile);
app.use('/portfolio',professionalPortfolio);
app.use("/profes",professionalProject)

app.listen(enviormentConfig.port, () => {
  console.log(`server is running on port ${enviormentConfig.port}`);
});
