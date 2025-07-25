export default function reviewRequestTemplate(clientName, professional, reviewLink) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #f7f7f7; padding: 32px;">
      <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 8px; box-shadow:0 2px 8px #eee; padding: 32px;">
        <div style="text-align:center;">
          <img src="https://i.ibb.co/3kqQk7n/buildquery-logo.png" alt="BuildQuery" style="height: 48px; margin-bottom: 16px;" />
          <h2 style="color: #2e6c80; margin-bottom: 8px;">We Value Your Feedback!</h2>
        </div>
        <p style="font-size: 16px; color: #222;">
          Hi <b>${clientName}</b>,
        </p>
        <p style="font-size: 15px; color: #333;">
          We hope your experience with <b>${professional.fullName || ""}</b> was great.<br>
          Your feedback helps us improve and helps others choose the right professional!
        </p>
        <div style="margin: 32px 0 24px 0; text-align: center;">
          <a href="${reviewLink}" style="background: #2e6c80; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 4px; font-weight: bold; font-size: 16px;">
            Leave a Review
          </a>
        </div>
        <p style="font-size: 14px; color: #555;">
          Thank you for using <b>BuildQuery</b>!<br>
          <span style="font-size:12px;">This is an automated message. Please do not reply directly to this email.</span>
        </p>
      </div>
    </div>
  `;
}