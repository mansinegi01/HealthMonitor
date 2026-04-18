const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMedicationReminder(email, med) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "💊 Medication Reminder",
      text: `Time to take ${med.name} (${med.dose}) at ${med.scheduledTime}`,
    });

    console.log("📧 Email sent to:", email);
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

module.exports = { sendMedicationReminder };