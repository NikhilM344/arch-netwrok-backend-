import { configDotenv } from "dotenv"
configDotenv()
const nodeEnviorment = process.env.NODE_ENVIORMENT 

const enviormentConfig = {
port:nodeEnviorment === "production" ? process.env.PRD_BACKEND_RUNNING_PORT : process.env.DEV_BACKEND_RUNNING_PORT,
dbConnectionUri:nodeEnviorment === "production" ? process.env.PRD_DB_CONNECTION_STRING : process.env.DEV_DB_CONNECTION_STRING,
jwtSecretKey:nodeEnviorment === "production" ? process.env.PRD_JWT_BACKEND_SECURITY_KEY:process.env.PRD_JWT_BACKEND_SECURITY_KEY
}

export default enviormentConfig;









