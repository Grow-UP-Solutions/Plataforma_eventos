import "../../../DB.js";
import Coupon from "../../DB/Coupon.js";

export async function allCouponDb() {
  return await Coupon.find();
}

export async function oneCouponDb(id) {
  return await Coupon.findById({ _id: id });
}
