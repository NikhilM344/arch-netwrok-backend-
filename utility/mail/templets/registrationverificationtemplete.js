export const registrationVerifiedTemplate = (userName) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #2e6c80; margin-bottom: 8px;">Registration Verified!</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${userName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        We are pleased to inform you that your registration process has been 
        <b style="color:green;">successfully verified</b> by our admin team on <b>BuildQuery</b>.<br>
        You can now log in and start using our platform.
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <a href="http://www.buildquery.com" style="background: #2e6c80; color: #fff; text-decoration: none; padding: 10px 28px; border-radius: 4px; font-weight: bold;">
          Login Now
        </a>
      </div>
      <p style="font-size: 15px; color: #333;">
        If you face any issues while logging in, please contact our support team. We're happy to assist you.
      </p>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for registering with <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default registrationVerifiedTemplate;






