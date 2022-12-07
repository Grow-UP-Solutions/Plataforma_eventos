const { Schema, model } = require('mongoose');

const successSchema = new Schema(
  {
    idUser: {
      type: String,
      default: '',
    },
    idEvent: {
      type: String,
      default: '',
    },
    ganancia: {
      type: Number,
      default: 0,
    },
    dates: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model('SuccessPayment', successSchema);
