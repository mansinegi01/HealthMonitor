const cron = require("node-cron");
const Medication = require("../model/Medication");
const User = require("../model/user");
const { sendMedicationReminder } = require("../services/mailService");

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  console.log("⏰ Checking meds at:", hhmm);

  const meds = await Medication.find({
    scheduledTime: hhmm,
    isActive: true,
  });

  for (const med of meds) {
    const user = await User.findById(med.userId);
    if (!user) continue;

    await sendMedicationReminder(user.email, med);
  }
});