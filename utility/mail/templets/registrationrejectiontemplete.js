import enviormentConfig from "../../../configs/enviorment.js";

const registrationRejectedTemplate = (userName, reason) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #d9534f; margin-bottom: 8px;">Registration Rejected</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${userName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        We regret to inform you that your registration process has been 
        <b style="color:red;">rejected</b> by our admin team on <b>BuildQuery</b>.
      </p>
      <p style="font-size: 15px; color: #333; margin-top: 12px;">
        <b>Reason for rejection:</b><br>
        <span style="color:#d9534f;">${reason}</span>
      </p>
      <p style="font-size: 15px; color: #333; margin-top: 18px;">
        Please review the above reason and update your information if possible. 
        You may re-apply for registration once the necessary corrections are made.
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <a href="${enviormentConfig.frontEndBaseUrl}" style="background: #2e6c80; color: #fff; text-decoration: none; padding: 10px 28px; border-radius: 4px; font-weight: bold;">
          Re-Apply
        </a>
      </div>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for your interest in <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default registrationRejectedTemplate;
