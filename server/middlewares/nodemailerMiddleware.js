const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.log("❌ SMTP ERROR:", err);
  else console.log("✅ Brevo SMTP Ready");
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent");
    return true;
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    return false;
  }
};

module.exports = sendEmail;
