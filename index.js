import express from 'express'
import enviormentConfig from './configs/enviorment.js';
import connectDb from './configs/dbconfig.js';
import userRegistration from './router/auth/userauth.js'

const app = express();
connectDb();
app.use(express.json());

app.use('/userauth',userRegistration);
app.listen(enviormentConfig.port,()=>{
    console.log(`server is running on port ${enviormentConfig.port}`)
})