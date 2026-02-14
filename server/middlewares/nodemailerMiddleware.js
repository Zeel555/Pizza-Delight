const nodemailer = require("nodemailer");

let transporter;

// Prefer explicit Gmail app password if provided (recommended for Google accounts)
if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  console.log("ℹ️ Using Gmail SMTP with app password");
} else {
  // Fallback to generic SMTP settings (existing behaviour)
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: (process.env.SMTP_SECURE === 'true') || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log("ℹ️ Using custom SMTP transport");
}

transporter.verify((err) => {
  if (err) console.log("❌ SMTP ERROR:", err);
  else console.log("✅ SMTP Ready");
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
