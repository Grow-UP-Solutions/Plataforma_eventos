import "../../../DB.js";
import Coupon from "../../db/Coupon.js";

export async function allCouponDb() {
  return await Coupon.find();
}

export async function oneCouponDb(id) {
  return await Coupon.findById({ _id: id });
}
