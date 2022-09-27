import "../../../DB.js";

import OpinionsOrganizer from "../../db/OpinionsOrganizer.js";

/** basic user database operations */

export async function allOpinionsOrgDb() {
  return await OpinionsOrganizer.find();
}
export async function oneOpinionsOrgDb(params) {
  return (
    (await OpinionsOrganizer.findOne({ name: params }).populate("user")) ||
    (await OpinionsOrganizer.findById(params).populate("user"))
  );
}
export async function updateOneOpinionsOrgDb(id, newOpinions) {
  return await OpinionsOrganizer.findByIdAndUpdate({ _id: id }, newOpinions, {
    new: 1,
  }).populate("user");
}
export async function deleteOneOpinionsOrgDb(id) {
  return await OpinionsOrganizer.findByIdAndDelete(id);
}
