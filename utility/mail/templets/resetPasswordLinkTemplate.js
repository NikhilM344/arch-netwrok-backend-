export const resetPasswordLinkTemplate = (userName, resetLink) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #2e6c80; margin-bottom: 8px;">Reset Your Password</h2>
      </div>

      <p style="font-size: 16px; color: #222;">
        Hi <b>${userName}</b>,
      </p>

      <p style="font-size: 15px; color: #333;">
        We received a request to reset your <b>BuildQuery</b> account password.  
        Click the button below to set a new password:
      </p>

      <div style="margin: 28px 0; text-align: center;">
        <a href="${resetLink}"
           style="background: #2e6c80; color: #fff; text-decoration: none;
                  padding: 12px 24px; border-radius: 4px; font-size: 16px; font-weight: bold;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #555; text-align:center;">
        This link will expire in <b>15 minutes</b>.  
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for using <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default resetPasswordLinkTemplate;