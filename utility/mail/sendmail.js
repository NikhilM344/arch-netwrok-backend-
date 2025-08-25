import nodemailer from "nodemailer";
import enviormentConfig from "../../configs/enviorment.js";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "buildquery27@gmail.com",
//     pass: enviormentConfig.mailAppPassword 
//   }
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 465 use karna ho toh secure: true rakho
  secure: false,
  auth: {
    user: "buildquery27@gmail.com",
    pass: enviormentConfig.mailAppPassword
  },
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: '"BuildQuery" <buildquery27@gmail.com>',
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Mail send error:", err);
    return false;
  }
};

export default sendMail;