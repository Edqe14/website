import mongoose from 'mongoose';

const checkSchemas = async () => {
  const names = mongoose.modelNames();
  if (!names.includes('data')) await import('./models/Data');
};

export default async function Connect(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log('Database connected'));
  }
  await checkSchemas();
}
