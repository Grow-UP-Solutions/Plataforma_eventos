const { Schema, model } = require('mongoose');

const codeDiscountSchema = new Schema({
  idCreator: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  value: {
    type: Number,
    default: 0,
  },
  isRedimeed: {
    type: Boolean,
    default: false,
  },
  dateRedimeed: {
    type: String,
    default: '',
  },
  userRedimeed: {
    type: String,
    default: '',
  },
});

module.exports = model('CodeDiscount', codeDiscountSchema);
