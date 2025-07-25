const requestAcceptedTemplate = (clientName, professional) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #2e6c80; margin-bottom: 8px;">Request Accepted!</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${clientName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        We are happy to inform you that your request has been <b style="color:green;">accepted</b> by a professional on <b>BuildQuery</b>.<br>
        Here are the professional's details:
      </p>
      <table style="width:100%; margin: 18px 0 24px 0; font-size: 15px;">
        <tr>
          <td style="padding: 6px 0; width: 120px;"><b>Name:</b></td>
          <td style="padding: 6px 0;">${professional.fullName || ""}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><b>Email:</b></td>
          <td style="padding: 6px 0;">${professional.email || ""}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><b>Phone:</b></td>
          <td style="padding: 6px 0;">${professional.mobileNumber || ""}</td>
        </tr>
      </table>
      <p style="font-size: 15px; color: #333;">
        The professional will contact you soon to discuss your project further.<br>
        If you have any questions, simply reply to this email.
      </p>
      <div style="margin: 32px 0 0 0; text-align: center;">
        <a href="http://www.buildquery.com/" style="background: #2e6c80; color: #fff; text-decoration: none; padding: 10px 28px; border-radius: 4px; font-weight: bold;">Visit BuildQuery</a>
      </div>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for choosing <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default requestAcceptedTemplate;