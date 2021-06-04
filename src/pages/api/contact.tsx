import mongoose from 'mongoose';
import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { DataInterface } from '@database/Types';
import Connect from '@/database/DB';
import Middlewares from '@/components/Middlewares';

export default async (
  req: IncomingMessage,
  res: NextApiResponse
): Promise<void> => {
  if (!(await Middlewares(req, res))) return;
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Only accepting "GET" requests' });

  await Connect();
  const data = await mongoose.model('data').findOne(
    {
      type: 'contact',
    },
    { 'data.targetEmail': 0, _id: 0 }
  );

  if (!data) return res.status(404).json({ message: 'Cannot find data' });
  return res.status(200).json((data.toJSON() as DataInterface).data);
};
