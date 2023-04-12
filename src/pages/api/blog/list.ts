import getPaginatedPosts from '@/lib/getPaginatedPosts';
import parsePage from '@/lib/parsePage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    });
  }

  const page = parsePage(req.query.page, 1);
  const limit = parsePage(req.query.limit, 10);

  const data = getPaginatedPosts(page, limit);

  return res.status(200).json(data);
}
