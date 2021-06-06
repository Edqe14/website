import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import Middlewares from '@/components/Middlewares';
import getData from '@/utils/getData';

export default async (
  req: IncomingMessage,
  res: NextApiResponse
): Promise<void> => {
  if (!(await Middlewares(req, res))) return;
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Only accepting "GET" requests' });

  const data = await getData('about:projects');

  if (!data) return res.status(404).json({ message: 'Cannot find data' });
  return res.status(200).json(data);
};
