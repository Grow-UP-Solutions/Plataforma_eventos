const { Schema, model } = require('mongoose');

const couponSchema = new Schema({
  coupon: String,
  limit: Number,
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
  },
},{ timestamps: true });

module.exports = model('Coupon', couponSchema);
