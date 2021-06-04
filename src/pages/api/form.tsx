import { Request, Response } from 'express';
import sendMail from '@/components/Mailer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: Request, res: Response): Promise<any> => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Only accepting "POST" requests' });

  const { name, email, message } = req.body;
  const response = await sendMail(email, name, message).catch((e) => {
    res.status(500).json({ message: `Failed to send email: ${e.message}` });
    return false;
  });

  if (response)
    return res
      .status(200)
      .json({ message: 'Successfully sent email to recipient' });
};
