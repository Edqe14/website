// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'data',
  new Schema({
    type: String,
    data: Schema.Types.Mixed,
  })
);
