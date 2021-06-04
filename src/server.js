/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const rateLimiter = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const csrfProtection = csrf({ cookie: true });
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: dev ? 0 : 75,
});

app.prepare().then(async () => {
  const port = process.env.PORT || 3000;
  const server = express();

  try {
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(limiter);
    server.use(csrfProtection);
    server.use(
      (req, res, next) => res.cookie('XSRF-TOKEN', req.csrfToken()) && next()
    );

    server.all('*', (req, res) => handle(req, res));
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
