import cron from "node-cron";
import { ScheduledReviewMail } from "../../models/mail/scheduledReviewMail.js";
import sendMail from "./sendmail.js";
import reviewRequestTemplate from "./templets/reviewmailtemp.js";

cron.schedule("* * * * *", async () => { 
  const now = new Date();
  console.log("this cron job is running at", now);

  const mails = await ScheduledReviewMail.find({ sent: false, sendAt: { $lte: now } });
  console.log("Mails to send:", mails.length);

  for (const mail of mails) {
    try {
      const reviewLink = `http://localhost:8080/review?professionalId=${mail.professionalId}&requestId=${mail.requestId}`;
      console.log("Sending mail to:", mail.email);
      await sendMail(
        mail.email,
        "We'd love your feedback!",
        reviewRequestTemplate(mail.clientName, mail.professional, reviewLink)
      );
      mail.sent = true;
      await mail.save();
      console.log("Mail sent and marked as sent for:", mail.email);
    } catch (err) {
      console.error("Failed to send scheduled review mail:", err);
    }
  }
});