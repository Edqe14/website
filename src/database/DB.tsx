import mongoose from 'mongoose';

const checkSchemas = async () => {
  const names = mongoose.modelNames();
  if (!names.includes('data')) await import('./models/Data');
};

checkSchemas();
