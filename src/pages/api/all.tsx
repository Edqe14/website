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

  try {
    const [greeting, about, projects, contact] = await Promise.all([
      getData('greeting'),
      getData('about:me'),
      getData('about:projects'),
      getData('contact'),
    ]);

    const data = {
      greeting,
      about,
      projects,
      contact,
    };

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch data' });
  }
};
