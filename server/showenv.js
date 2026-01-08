// showenv.js
require('dotenv').config();
console.log('SENDER_EMAIL=', process.env.SENDER_EMAIL);
console.log('SENDER_PASSWORD=', process.env.SENDER_PASSWORD ? '[SET]' : '[EMPTY]');
