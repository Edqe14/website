import { Request, Response } from 'express';
import sendMail from '@/components/Mailer';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: Request, res: Response): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  bodyParser.json()(req, res, () => {});
  if (
    !(await new Promise((resolve) => {
      limiter(req, res, (e) => (e ? resolve(false) : resolve(true)));
    }))
  )
    return;

  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Only accepting "POST" requests' });

  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: 'Missing elements' });

  const response = await sendMail(email, name, message).catch((e) => {
    res.status(500).json({ message: `Failed to send email: ${e.message}` });
    return false;
  });

  if (response)
    return res
      .status(200)
      .json({ message: 'Successfully sent email to recipient' });
};
