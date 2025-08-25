// import { configDotenv } from "dotenv";
// configDotenv();
// const nodeEnviorment = process.env.NODE_ENV;

// const enviormentConfig = {
//   port:
//     nodeEnviorment === "production"
//       ? process.env.PRD_BACKEND_RUNNING_PORT
//       : process.env.DEV_BACKEND_RUNNING_PORT,
//   dbConnectionUri:
//     nodeEnviorment === "production"
//       ? process.env.PRD_DB_CONNECTION_STRING
//       : process.env.DEV_DB_CONNECTION_STRING,
//   jwtSecretKey:
//     nodeEnviorment === "production"
//       ? process.env.PRD_JWT_BACKEND_SECURITY_KEY
//       : process.env.PRD_JWT_BACKEND_SECURITY_KEY,
//   backendBaseUrl:
//     nodeEnviorment === "production"
//       ? process.env.PRD_BACKEND_BASE_URL
//       : process.env.DEV_BACKEND_BASE_URL,
//   mailAppPassword:
//     nodeEnviorment === "production"
//       ? process.env.PRD_MAIL_APP_PASSWORD
//       : process.env.DEV_MAIL_APP_PASSWORD,
//   adminEmail:
//     nodeEnviorment === "production"
//       ? process.env.PRD_ADMIN_EMAIL
//       : process.env.DEV_ADMIN_EMAIL,
//   adminPassword:
//     nodeEnviorment === "production"
//       ? process.env.PRD_ADMIN_PASSWORD
//       : process.env.DEV_ADMIN_PASSWORD,
//   adminAutoCreate:
//     nodeEnviorment === "production"
//       ? process.env.PRD_ADMIN_AUTO_CREATE
//       : process.env.DEV_ADMIN_AUTO_CREATE,
//   twilioSid:
//     nodeEnviorment === "production"
//       ? process.env.PRD_Twilio_Account_Sid
//       : process.env.DEV_Twilio_Account_Sid,
//       twilioAuthToken:
//     nodeEnviorment === "production"
//       ? process.env.PRD_Twilio_AuthToken
//       : process.env.Dev_Twilio_AuthToken,
//       twilioPhone:
//     nodeEnviorment === "production"
//       ? process.env.PRD_Twilio_Phone
//       : process.env.DEV_Twilio_Phone
// };

// export default enviormentConfig;

import dotenv from "dotenv";
dotenv.config();

const nodeEnviorment = process.env.NODE_ENV; // Now matches .env (NODE_ENV)

const enviormentConfig = {
  port:
    nodeEnviorment === "production"
      ? process.env.PRD_BACKEND_RUNNING_PORT
      : process.env.DEV_BACKEND_RUNNING_PORT,
  dbConnectionUri:
    nodeEnviorment === "production"
      ? process.env.PRD_DB_CONNECTION_STRING
      : process.env.DEV_DB_CONNECTION_STRING,
  jwtSecretKey:
    nodeEnviorment === "production"
      ? process.env.PRD_JWT_BACKEND_SECURITY_KEY
      : process.env.DEV_JWT_BACKEND_SECURITY_KEY,
  backendBaseUrl:
    nodeEnviorment === "production"
      ? process.env.PRD_BACKEND_BASE_URL
      : process.env.DEV_BACKEND_BASE_URL,
  mailAppPassword:
    nodeEnviorment === "production"
      ? process.env.PRD_MAIL_APP_PASSWORD
      : process.env.DEV_MAIL_APP_PASSWORD,
  adminEmail:
    nodeEnviorment === "production"
      ? process.env.PRD_ADMIN_EMAIL
      : process.env.DEV_ADMIN_EMAIL,
  adminPassword:
    nodeEnviorment === "production"
      ? process.env.PRD_ADMIN_PASSWORD
      : process.env.DEV_ADMIN_PASSWORD,
  adminAutoCreate:
    nodeEnviorment === "production"
      ? process.env.PRD_ADMIN_AUTO_CREATE
      : process.env.DEV_ADMIN_AUTO_CREATE,
  twilioSid:
    nodeEnviorment === "production"
      ? process.env.PRD_Twilio_Account_Sid
      : process.env.DEV_Twilio_Account_Sid,
  twilioAuthToken:
    nodeEnviorment === "production"
      ? process.env.PRD_Twilio_AuthToken
      : process.env.DEV_Twilio_AuthToken,
  twilioPhone:
    nodeEnviorment === "production"
      ? process.env.PRD_Twilio_Phone
      : process.env.DEV_Twilio_Phone,
};

export default enviormentConfig;

