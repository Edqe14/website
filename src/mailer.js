/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = (email, name, text) => {
  const from = name && email ? `${name} <${email}>` : name || email;

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from,
        to: process.env.EMAIL,
        subject: `Message from ${from}`,
        text: `${from}\n\n${text}`,
        replyTo: from,
      },
      (e, i) => (e ? reject(e) : resolve(i))
    );
  });
};
