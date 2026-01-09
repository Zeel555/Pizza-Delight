const sendEmail = require('../middlewares/nodemailerMiddleware');

/**
 * Reusable email helper
 * @param {string} to - receiver email
 * @param {string} subject - email subject
 * @param {string} text - plain text body
 * @returns {boolean} success/failure
 */
const sendMail = async (to, subject, text) => {
  return await sendEmail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
  });
};

module.exports = sendMail;
