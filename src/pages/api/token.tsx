import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import Middlewares from '@/components/Middlewares';

export default async (
  req: IncomingMessage,
  res: NextApiResponse
): Promise<void> => {
  if (!(await Middlewares(req, res))) return;
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Only accepting "GET" requests' });

  // @ts-expect-error CSURF
  return res.status(200).json({ data: req.csrfToken() });
};
