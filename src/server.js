/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const rateLimiter = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sendMail = require('./mailer.js');
const csrfProtection = csrf({ cookie: true });
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: dev ? 0 : 75,
});

app.prepare().then(async () => {
  await mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Database connected'));

  const port = process.env.PORT || 3000;
  const server = express();

  try {
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(csrfProtection);
    server.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });
    server.get('*', limiter, (req, res) => handle(req, res));
    server.post('/api/form', async (req, res) => {
      const { name, email, message } = req.body;

      const sent = await sendMail(email, name, message).catch((e) => {
        res.status(500).json({ message: `Failed to send mail` });
        console.error(e);

        return false;
      });

      if (sent) res.status(200).json({ message: 'Success' });
    });
    server.use((err, _, res, next) => {
      if (err.code !== 'EBADCSRFTOKEN') return next(err);

      // handle CSRF token errors here
      res.status(403).json({ message: 'Invalid CSRF token' });
    });
    server.listen(port, (e) => {
      if (e) throw e;
      console.log(`Listening on port ${port}`);
    });
  } catch (e) {
    if (e?.message.includes('invalid csrf token')) return;
    console.error(e);
  }
});
