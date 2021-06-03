import rateLimiter from 'express-rate-limit';
import { Request, Response } from 'express';

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  handler: (req, res, next) => {
    res.status(429).send('Too many requests, please try again later.');
    if (next) next(false);
  },
});

export default limiter;
export const Middleware = (req: Request, res: Response): Promise<boolean> => {
  return new Promise((resolve) => {
    limiter(req, res, (n: unknown) => resolve(n === undefined));
  });
};
