export const emailVerificationTemplate = (userName, otp) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #2e6c80; margin-bottom: 8px;">Email Verification</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${userName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        Welcome to <b>BuildQuery</b>! To complete your registration, please verify your email address using the OTP below.
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <div style="background: #f0f0f0; display: inline-block; padding: 12px 24px; border-radius: 4px; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2e6c80;">
          ${otp}
        </div>
      </div>
      <p style="font-size: 14px; color: #555; text-align:center;">
        This OTP will expire in <b>10 minutes</b>.
      </p>
      <p style="font-size: 15px; color: #333;">
        If you did not create an account with us, please ignore this email.
      </p>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for choosing <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default emailVerificationTemplate;
