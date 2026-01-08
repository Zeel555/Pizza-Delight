const nodemailer = require('nodemailer');
const sendMail = require('../utils/sendMail');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

await sendMail(user.email, 'Subject', '<b>Your HTML message</b>');

module.exports = sendMail;