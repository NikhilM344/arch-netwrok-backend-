export const projectRejectedTemplate = (userName, projectTitle, rejectionReason) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
    <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
      <div style="text-align:center;">
        <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
        <h2 style="color: #c0392b; margin-bottom: 8px;">Project Rejected</h2>
      </div>
      <p style="font-size: 16px; color: #222;">
        Hi <b>${userName}</b>,
      </p>
      <p style="font-size: 15px; color: #333;">
        We regret to inform you that your project titled <b style="color: #c0392b;">"${projectTitle}"</b> has been 
        <b style="color:red;">rejected</b> by our admin team after careful review.
      </p>
      <p style="font-size: 15px; color: #333;">
        <b>Reason for rejection:</b><br>
        <i style="color:#555;">"${rejectionReason}"</i>
      </p>
      <p style="font-size: 15px; color: #333;">
        You may review the project details, make the necessary changes, and re-upload it for reconsideration.
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <a href="http://www.buildquery.com/dashboard" style="background: #c0392b; color: #fff; text-decoration: none; padding: 10px 28px; border-radius: 4px; font-weight: bold;">
          Update Project
        </a>
      </div>
      <p style="font-size: 15px; color: #333;">
        If you need further clarification or assistance, feel free to contact our support team.
      </p>
      <p style="color:#888; font-size:13px; margin-top:32px;">
        Thank you for your effort on <b>BuildQuery</b>!<br>
        <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
      </p>
    </div>
  </div>
`;

export default projectRejectedTemplate;
