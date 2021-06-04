import mongoose from 'mongoose';
import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { DataInterface } from '@database/Types';
import '@/database/DB';

export default async (
  req: IncomingMessage,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Only accepting "GET" requests' });

  const data = await mongoose.model('data').findOne(
    {
      type: 'about:me',
    },
    { _id: 0 }
  );

  if (!data) return res.status(404).json({ message: 'Cannot find data' });
  return res.status(200).json((data.toJSON() as DataInterface).data);
};
