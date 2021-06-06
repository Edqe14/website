import { DataInterface } from '@/database/Types';
import Connect from '@/database/DB';
import mongoose from 'mongoose';

export default async function getData(type: string): Promise<unknown> {
  await Connect();
  const data = await mongoose.model('data').findOne(
    {
      type,
    },
    { 'data.targetEmail': 0, _id: 0 }
  );

  if (!data) return null;

  return (data.toJSON() as DataInterface).data;
}
