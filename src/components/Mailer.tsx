import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default function sendMail(
  email: string,
  name: string,
  text: string
): Promise<unknown> {
  const from = name && email ? `${name} <${email}>` : name || email;

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from,
        to: process.env.EMAIL,
        subject: `Message from ${from}`,
        text: `${from}\n\n${text}`,
        replyTo: from,
        // @ts-expect-error Worked when adding this
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN,
        },
      },
      (e, i) => (e ? reject(e) : resolve(i))
    );
  });
}
