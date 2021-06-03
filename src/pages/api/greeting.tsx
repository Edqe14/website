import mongoose from 'mongoose';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiResponse } from 'next';
import Connect from '@/database/DB';
import { Middleware } from '@/components/RateLimit';
import { Request, Response } from 'express';
import { DataInterface } from '@database/Types';

export default async (
  req: IncomingMessage,
  res: NextApiResponse
): Promise<void> => {
  if (!(await Middleware(req as Request, res as ServerResponse as Response)))
    return;
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Only accepting "GET" requests' });
  if (mongoose.connection.readyState === 0) await Connect();

  const greeting = await mongoose.model('data').findOne({
    type: 'greeting',
  });

  if (!greeting)
    return res.status(404).json({ message: 'Cannot find greeting data' });
  return res.status(200).json((greeting.toJSON() as DataInterface).data);
};
