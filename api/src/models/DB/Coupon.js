const { Schema, model } = require('mongoose');

const cuponSchema = new Schema({
  cupon: String,
  limit: Number,
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
  },
});

module.exports = model('Cupon', cuponSchema);
