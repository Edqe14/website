import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model(
  'data',
  new Schema({
    type: String,
    data: Schema.Types.Mixed,
  })
);
