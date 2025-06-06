import express from 'express'
import cors from 'cors'
import enviormentConfig from './configs/enviorment.js';
import connectDb from './configs/dbconfig.js';
import userRegistration from './router/auth/userauth.js'
import vendorRegistration from './router/auth/vendorauth.js'

const app = express();
connectDb();
app.use(cors())
app.use(express.json());

app.use('/userauth',userRegistration);
app.use("/auth",vendorRegistration);
app.listen(enviormentConfig.port,()=>{
    console.log(`server is running on port ${enviormentConfig.port}`)
})