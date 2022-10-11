require('../../../DB.js');
const Coupon = require('../../db/Coupon.js');

async function allCouponDb() {
  return await Coupon.find();
}

async function oneCouponDb(id) {
  return await Coupon.findById({ _id: id });
}

module.exports = {
  allCouponDb,
  oneCouponDb,
};
