require('dotenv').config();
const sendEmail = require('./middlewares/nodemailerMiddleware');

(async () => {
  try {
    const res = await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: 'Test Email from Pizza_Delight',
      text: 'This is a test email from your Node.js app.',
    });
    console.log('Send result:', res && (res.accepted || res.response) ? (res.accepted || res.response) : res);
  } catch (err) {
    console.error('Send failed:', err.message || err);
  }
})();
