const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //DEFINE THE EMAIL OPTIONS
  const mailOptions = {
    from: 'Manny <Manny@aledoux.net>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };

  // ACTUALLY SEND THE EMAIL
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;