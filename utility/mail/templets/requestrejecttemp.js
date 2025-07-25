const requestRejectedTemplate = (clientName, rejectionReason) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #c0392b; margin-bottom: 8px;">Request Rejected</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${clientName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        We regret to inform you that your request could not be accepted at this time.
      </p>
      <p style="font-size: 15px; color: #333;">
        <b>Reason:</b> <span style="color:#c0392b;">${rejectionReason}</span>
      </p>
      <p style="font-size: 15px; color: #333;">
        You can always submit a new request or explore other professionals on <b>BuildQuery</b>.
      </p>
      <div style="margin: 32px 0 0 0; text-align: center;">
        <a href="https://buildquery.com" style="background: #2e6c80; color: #fff; text-decoration: none; padding: 10px 28px; border-radius: 4px; font-weight: bold;">Visit BuildQuery</a>
      </div>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for considering <b>BuildQuery</b>.<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default requestRejectedTemplate;