import rateLimiter from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import bodyParser from 'body-parser';

const dev = process.env.NODE_ENV !== 'production';
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: dev ? 0 : 75,
});
const cookie = cookieParser();

export const allMiddlewares = {
  rateLimiter: limiter,
  cookie,
};

export default function Middlewares(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  return new Promise((resolve) => {
    bodyParser.json()(req, res, (e) => {
      if (e) return resolve(false);

      cookie(req, res, (e: unknown) => {
        if (e) return resolve(false);

        limiter(req as Request, res as Response, (e: unknown) => {
          if (e) return resolve(false);
          resolve(true);
        });
      });
    });
  });
}
