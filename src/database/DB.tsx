import mongoose from 'mongoose';

const checkSchemas = async () => {
  const names = mongoose.modelNames();
  if (!names.includes('data')) await import('./models/Data');
};

export default async function Connect(): Promise<void> {
  await checkSchemas();
  await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
